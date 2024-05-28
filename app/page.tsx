// app/page.tsx
'use client'

import { useState } from 'react'
import { calculateCgpa } from '@/utils/calculateCGPA'
import Instructions from './instructions'
import Footer from './footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

type Grade = 'S' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';

const grades: Grade[] = ['S', 'A+', 'A', 'B+', 'B', 'C', 'P', 'F'];

const Home = () => {
  const [subjects, setSubjects] = useState<{ name: string, grade: Grade, credits: number }[]>([])
  const [cgpa, setCgpa] = useState<number | null>(null)

  const addSubject = () => {
    setSubjects([...subjects, { name: '', grade: 'S', credits: 0 }])
  }

  const handleCalculate = () => {
    if (subjects.some(sub => sub.name === '' || sub.credits <= 0)) {
      alert('Please fill all the fields correctly.')
      return
    }
    const result = calculateCgpa(subjects)
    setCgpa(result)
  }

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4">CGPA Calculator</h1>
      {subjects.map((subject, index) => (
        <div key={index} className="flex flex-col sm:flex-row items-center mb-2 w-full">
          <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Subject Name</label>
            <Input
              type="text"
              value={subject.name}
              onChange={(e) => {
                const newSubjects = [...subjects]
                newSubjects[index].name = e.target.value
                setSubjects(newSubjects)
              }}
              className="w-full p-2 border rounded"
              placeholder="Subject Name"
            />
          </div>
          <div className="w-full sm:w-1/4 mb-2 sm:mb-0 sm:ml-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Grade</label>
            <Select
              onValueChange={(value) => {
                const newSubjects = [...subjects]
                newSubjects[index].grade = value as Grade
                setSubjects(newSubjects)
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
          <div className="w-full sm:w-1/4 mb-2 sm:mb-0 sm:ml-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Credits</label>
            <Input
              type="number"
              value={subject.credits === 0 ? '' : subject.credits}
              onChange={(e) => {
                const newSubjects = [...subjects]
                newSubjects[index].credits = parseInt(e.target.value, 10)
                setSubjects(newSubjects)
              }}
              className="w-full p-2 border rounded"
              placeholder="Credits"
            />
          </div>
          <Button onClick={() => setSubjects(subjects.filter((_, i) => i !== index))} className="ml-2 mt-4 sm:mt-0">
            Remove
          </Button>
        </div>
      ))}
      <div className="flex justify-between items-center mt-4 space-x-2">
        <Button onClick={addSubject}>Add Subject</Button>
        <Button onClick={handleCalculate}>Calculate CGPA</Button>
      </div>
      <div className="mt-8">
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
  )
}

export default Home