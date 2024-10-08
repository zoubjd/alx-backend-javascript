export default function getListStudentIds(arrayOfStudents) {
  if (typeof arrayOfStudents !== 'object') return [];
  return arrayOfStudents.map((student) => student.id);
}
