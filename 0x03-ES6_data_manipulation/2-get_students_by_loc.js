export default function getStudentsByLocation(arrayOfStudents, location) {
  if (typeof arrayOfStudents !== 'object') return [];
  return arrayOfStudents.filter((student) => student.location === location);
}
