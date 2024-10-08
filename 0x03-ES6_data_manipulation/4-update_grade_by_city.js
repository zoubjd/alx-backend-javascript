export default function updateStudentGradeByCity(students, city, newGrades) {
  let found = false;
  return students.filter((student) => student.location === city).map((student) => {
    for (const grade of newGrades) {
      if (student.id === grade.studentId) {
        student.grade = grade.grade;
        found = true;
        break;
      }
    }
    if (!found) {
      student.grade = 'N/A';
    }
    return student;
  });
}
