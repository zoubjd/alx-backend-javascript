export default function getStudentIdsSum(arrayOfStudents) {
  if (typeof arrayOfStudents !== 'object') return [];
  return arrayOfStudents.reduce((acc, student) => acc += student.id, 0);
}
