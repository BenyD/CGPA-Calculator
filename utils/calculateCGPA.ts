type Grade = "S" | "A+" | "A" | "B+" | "B" | "C" | "P" | "F";

const gradePoints: Record<Grade, number> = {
  S: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  P: 4,
  F: 0,
};

export function calculateCgpa(
  grades: { grade: Grade; credits: number }[]
): number {
  let totalAchieved = 0;
  let totalCredits = 0;

  grades.forEach(({ grade, credits }) => {
    const gradePoint = gradePoints[grade];
    totalAchieved += gradePoint * credits;
    totalCredits += credits;
  });

  return totalAchieved / totalCredits;
}

// Unused Function (Refer Page.tsx To Do)
export function calculateTotalGradePoints(
  grades: { grade: Grade; credits: number }[]
): number {
  let totalGradePoints = 0;

  grades.forEach(({ grade, credits }) => {
    const gradePoint = gradePoints[grade];
    totalGradePoints += gradePoint * credits;
  });

  return totalGradePoints;
}
