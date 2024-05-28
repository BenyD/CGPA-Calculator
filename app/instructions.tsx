/* eslint-disable react/no-unescaped-entities */
// app/instructions.tsx
const Instructions = () => (
    <div className="mt-4 p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Instructions</h2>
      <ul className="list-disc list-inside">
        <li>Enter the subject name, grade, and the corresponding credits for each subject.</li>
        <li>Click on "Add Subject" to add more subjects.</li>
        <li>Click "Calculate CGPA" to get your CGPA.</li>
      </ul>
    </div>
  )
  
  export default Instructions