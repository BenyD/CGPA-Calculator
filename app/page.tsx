"use client";

import { useState, useEffect } from "react";
import {
  calculateCgpa,
  calculateTotalGradePoints, // TO DO: Calculate Total Grade Points
} from "@/utils/calculateCGPA";
import Instructions from "./instructions";
import Footer from "./footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import trashIcon from "@iconify-icons/mdi/trash";

type Grade = "S" | "A+" | "A" | "B+" | "B" | "C" | "P" | "F";

const grades: Grade[] = ["S", "A+", "A", "B+", "B", "C", "P", "F"];

interface Subject {
  name: string;
  grade: Grade;
  credits: number;
  valid: boolean;
}

interface Semester {
  id: number;
  subjects: Subject[];
  gpa?: number;
}

const initialSemesters: Semester[] = [
  {
    id: 1,
    subjects: Array.from({ length: 4 }, () => ({
      name: "",
      grade: "S" as Grade,
      credits: 0,
      valid: true,
    })),
  },
];

const Home = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gpaResults, setGpaResults] = useState<
    { semesterId: number; gpa: number }[]
  >([]);

  useEffect(() => {
    setSemesters(initialSemesters);
  }, []);

  const addSemester = () => {
    setSemesters([
      ...semesters,
      {
        id: semesters.length + 1,
        subjects: Array.from({ length: 4 }, () => ({
          name: "",
          grade: "S" as Grade,
          credits: 0,
          valid: true,
        })),
      },
    ]);
  };

  const removeSemester = (semesterId: number) => {
    setSemesters(semesters.filter((semester) => semester.id !== semesterId));
    setGpaResults(
      gpaResults.filter((result) => result.semesterId !== semesterId)
    );
  };

  const addSubject = (semesterId: number) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: [
                ...semester.subjects,
                { name: "", grade: "S", credits: 0, valid: true },
              ],
            }
          : semester
      )
    );
  };

  const handleCalculateGpa = (semesterId: number) => {
    const semester = semesters.find((sem) => sem.id === semesterId);
    if (!semester) return;

    let valid = true;
    const updatedSubjects = semester.subjects.map((subject) => {
      if (subject.name === "" || subject.credits <= 0) {
        valid = false;
        return { ...subject, valid: false };
      }
      return { ...subject, valid: true };
    });

    if (!valid) {
      setError("Please fill all the fields correctly.");
      setSemesters((prevSemesters) =>
        prevSemesters.map((sem) =>
          sem.id === semesterId ? { ...sem, subjects: updatedSubjects } : sem
        )
      );
      return;
    }

    const result = calculateCgpa(updatedSubjects);
    setSemesters((prevSemesters) =>
      prevSemesters.map((sem) =>
        sem.id === semesterId ? { ...sem, gpa: result } : sem
      )
    );
    setGpaResults((prevResults) => [
      ...prevResults.filter((result) => result.semesterId !== semesterId),
      { semesterId, gpa: result },
    ]);
    setError(null);
  };

  const calculateAllGpas = () => {
    const updatedSemesters = semesters.map((semester) => {
      let valid = true;
      const updatedSubjects = semester.subjects.map((subject) => {
        if (subject.name === "" || subject.credits <= 0) {
          valid = false;
          return { ...subject, valid: false };
        }
        return { ...subject, valid: true };
      });

      if (!valid) {
        setError("Please fill all the fields correctly.");
        return { ...semester, subjects: updatedSubjects, gpa: undefined };
      }

      const result = calculateCgpa(updatedSubjects);
      return { ...semester, subjects: updatedSubjects, gpa: result };
    });

    setSemesters(updatedSemesters);
    return updatedSemesters;
  };

  const handleCalculateCgpa = () => {
    const updatedSemesters = calculateAllGpas();
    const gpas = updatedSemesters
      .map((semester) => semester.gpa)
      .filter((gpa): gpa is number => gpa !== undefined);
    if (gpas.length === 0) {
      setError("Please fill all the fields correctly for all subjects.");
      return;
    }
    const result = gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length;
    setCgpa(result);
    setGpaResults(
      updatedSemesters
        .filter((semester) => semester.gpa !== undefined)
        .map((semester) => ({
          semesterId: semester.id,
          gpa: semester.gpa as number,
        }))
    );
    setIsModalOpen(true);
    setError(null);
  };

  if (semesters.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col grow">
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}
      {semesters.map((semester) => (
        <motion.div
          key={semester.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Semester {semester.id}</h2>
            <Button
              onClick={() => removeSemester(semester.id)}
              className="p-2"
              variant={"destructive"}
            >
              <span className="hidden sm:inline">Remove Semester</span>
              <Icon icon={trashIcon} className="w-4 h-4 sm:hidden" />
            </Button>
          </div>
          {semester.subjects.map((subject, index) => (
            <motion.div
              key={index}
              className="flex flex-wrap items-end mb-4 w-full space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Subject Name
                </label>
                <Input
                  type="text"
                  value={subject.name}
                  onChange={(e) => {
                    const newSubjects = [...semester.subjects];
                    newSubjects[index].name = e.target.value;
                    newSubjects[index].valid = true;
                    setSemesters((prevSemesters) =>
                      prevSemesters.map((sem) =>
                        sem.id === semester.id
                          ? { ...sem, subjects: newSubjects }
                          : sem
                      )
                    );
                  }}
                  className={`w-full p-2 border rounded ${
                    !subject.valid && subject.name === ""
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Subject Name"
                />
              </div>
              <div className="w-full sm:w-1/3 sm:pl-2 mt-2 sm:mt-0">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Grade
                </label>
                <Select
                  onValueChange={(value) => {
                    const newSubjects = [...semester.subjects];
                    newSubjects[index].grade = value as Grade;
                    newSubjects[index].valid = true;
                    setSemesters((prevSemesters) =>
                      prevSemesters.map((sem) =>
                        sem.id === semester.id
                          ? { ...sem, subjects: newSubjects }
                          : sem
                      )
                    );
                  }}
                >
                  <SelectTrigger className="w-full p-2 border rounded">
                    <SelectValue placeholder="Select Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-1/3 sm:pl-2 mt-2 sm:mt-0">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Credits
                </label>
                <Input
                  type="number"
                  value={subject.credits === 0 ? "" : subject.credits}
                  onChange={(e) => {
                    const newSubjects = [...semester.subjects];
                    newSubjects[index].credits = parseInt(e.target.value, 10);
                    newSubjects[index].valid = true;
                    setSemesters((prevSemesters) =>
                      prevSemesters.map((sem) =>
                        sem.id === semester.id
                          ? { ...sem, subjects: newSubjects }
                          : sem
                      )
                    );
                  }}
                  className={`w-full p-2 border rounded ${
                    !subject.valid && subject.credits <= 0
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Credits"
                />
              </div>
              <div className="w-full mt-4 flex justify-end">
                <Button
                  onClick={() =>
                    setSemesters((prevSemesters) =>
                      prevSemesters.map((sem) =>
                        sem.id === semester.id
                          ? {
                              ...sem,
                              subjects: sem.subjects.filter(
                                (_, i) => i !== index
                              ),
                            }
                          : sem
                      )
                    )
                  }
                  className="ml-2 sm:ml-2 p-2"
                  variant={"destructive"}
                >
                  <span className="hidden sm:inline">Remove</span>
                  <Icon icon={trashIcon} className="w-4 h-4 sm:hidden" />
                </Button>
              </div>
            </motion.div>
          ))}
          <div className="flex mt-4 max-sm:justify-center max-sm:mt-8 space-x-2">
            <Button onClick={() => addSubject(semester.id)}>Add Subject</Button>
            <Button onClick={() => handleCalculateGpa(semester.id)}>
              Calculate GPA
            </Button>
          </div>
          {semester.gpa !== undefined && (
            <div className="mt-4 p-4 border rounded bg-gray-100 dark:bg-gray-700">
              <p className="text-lg font-semibold text-center">
                GPA for Semester {semester.id}: {semester.gpa.toFixed(2)}
              </p>
            </div>
          )}
        </motion.div>
      ))}
      <div className="flex mt-4 space-x-2">
        <Button className="w-full" onClick={addSemester}>
          Add Semester
        </Button>
        <Button className="w-full" onClick={handleCalculateCgpa}>
          Calculate CGPA
        </Button>
      </div>
      <Separator className="my-8" />
      <div className="mb-8">
        <Instructions />
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>CGPA Calculation Result</DialogTitle>
            <Separator className="my-2" />
            <DialogDescription>
              {gpaResults
                .sort((a, b) => a.semesterId - b.semesterId)
                .map(({ semesterId, gpa }) => (
                  <p key={semesterId}>
                    GPA for Semester {semesterId}: {gpa.toFixed(2)}
                  </p>
                ))}
              <p className="mt-4">Your CGPA is: {cgpa?.toFixed(2)}</p>
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
