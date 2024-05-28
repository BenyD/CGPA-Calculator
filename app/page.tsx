// app/page.tsx
"use client";

import { useState } from "react";
import { calculateCgpa } from "@/utils/calculateCGPA";
import Instructions from "./instructions";
import Footer from "./footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Grade = "S" | "A+" | "A" | "B+" | "B" | "C" | "P" | "F";

const grades: Grade[] = ["S", "A+", "A", "B+", "B", "C", "P", "F"];

const Home = () => {
  const [subjects, setSubjects] = useState<
    { name: string; grade: Grade; credits: number; valid: boolean }[]
  >([]);
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
      <h1 className="text-2xl font-bold mb-4">CGPA Calculator</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {subjects.map((subject, index) => (
        <div
          key={index}
          className="flex flex-wrap items-end mb-2 w-full space-y-2"
        >
          <div className="w-full">
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
          <div className="w-full mt-2">
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
          <div className="w-full mt-2">
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
          <div className="w-full mt-2 flex justify-end">
            <Button
              onClick={() =>
                setSubjects(subjects.filter((_, i) => i !== index))
              }
              className="ml-2"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-4 space-x-2">
        <div className="flex space-x-2">
          <Button onClick={addSubject}>Add Subject</Button>
          <Button onClick={handleCalculate}>Calculate CGPA</Button>
        </div>
      </div>
      <hr className="my-8 border-t border-gray-300" />
      <div className="mt-0">
        <Instructions />
      </div>
      {cgpa !== null && (
        <div className="mt-4">
          <h2 className="text-xl">Your CGPA is: {cgpa.toFixed(2)}</h2>
        </div>
      )}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
