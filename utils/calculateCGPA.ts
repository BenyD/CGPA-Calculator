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
    totalCredits += 10 * credits;
  });

  return (totalAchieved / totalCredits) * 10;
}

export function calculateTotalGradePoints(
  grades: { grade: Grade; credits: number }[]
): number {
  let totalPoints = 0;

  grades.forEach(({ grade, credits }) => {
    const gradePoint = gradePoints[grade];
    totalPoints += gradePoint * credits;
  });

  return totalPoints;
}
