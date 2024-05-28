// app/page.tsx
"use client";

import { useState } from "react";
import { calculateCgpa } from "@/utils/calculateCGPA";
import Instructions from "./instructions";
import Footer from "./footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion"; // Importing framer-motion
import { Separator } from "@/components/ui/separator"; // Importing Separator

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Grade = "S" | "A+" | "A" | "B+" | "B" | "C" | "P" | "F";

const grades: Grade[] = ["S", "A+", "A", "B+", "B", "C", "P", "F"];

const initialSubjects = Array.from({ length: 3 }, () => ({
  name: "",
  grade: "S" as Grade,
  credits: 0,
  valid: true,
}));

const Home = () => {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { name: "", grade: "S", credits: 0, valid: true },
    ]);
  };

  const handleCalculate = () => {
    let valid = true;
    const updatedSubjects = subjects.map((subject) => {
      if (subject.name === "" || subject.credits <= 0) {
        valid = false;
        return { ...subject, valid: false };
      }
      return { ...subject, valid: true };
    });

    setSubjects(updatedSubjects);

    if (!valid) {
      setError("Please fill all the fields correctly.");
      return;
    }

    if (subjects.length === 0) {
      setError("Please add at least one subject.");
      return;
    }

    const result = calculateCgpa(subjects);
    setCgpa(result);
    setError(null); // Clear the error if calculation is successful
  };

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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        {subjects.map((subject, index) => (
          <motion.div
            key={index}
            className="flex flex-wrap items-end mb-4 w-full space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Subject Name
              </label>
              <Input
                type="text"
                value={subject.name}
                onChange={(e) => {
                  const newSubjects = [...subjects];
                  newSubjects[index].name = e.target.value;
                  newSubjects[index].valid = true;
                  setSubjects(newSubjects);
                }}
                className={`w-full p-2 border rounded ${
                  !subject.valid && subject.name === "" ? "border-red-500" : ""
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
                  const newSubjects = [...subjects];
                  newSubjects[index].grade = value as Grade;
                  newSubjects[index].valid = true;
                  setSubjects(newSubjects);
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
                  const newSubjects = [...subjects];
                  newSubjects[index].credits = parseInt(e.target.value, 10);
                  newSubjects[index].valid = true;
                  setSubjects(newSubjects);
                }}
                className={`w-full p-2 border rounded ${
                  !subject.valid && subject.credits <= 0 ? "border-red-500" : ""
                }`}
                placeholder="Credits"
              />
            </div>
            <div className="w-full mt-4 flex justify-end">
              <Button
                onClick={() =>
                  setSubjects(subjects.filter((_, i) => i !== index))
                }
                className="ml-2"
              >
                Remove
              </Button>
            </div>
          </motion.div>
        ))}
        <div className="flex mt-4 space-x-2">
          <Button onClick={addSubject}>Add Subject</Button>
          <Button onClick={handleCalculate}>Calculate CGPA</Button>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="mb-8">
        <Instructions />
      </div>
      {cgpa !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold">Your CGPA is: {cgpa.toFixed(2)}</h2>
        </motion.div>
      )}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
