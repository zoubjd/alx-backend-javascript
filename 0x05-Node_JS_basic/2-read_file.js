const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8'); // Read the file synchronously
    const rows = data.split('\n').filter((line) => line.trim() !== ''); // Split into rows and ignore empty lines

    if (rows.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    // Parse the header and the rows
    // const header = rows[0].split(','); // Extract headers (not used directly here)
    const students = rows.slice(1); // Skip the header row

    const fields = {}; // To group students by field

    students.forEach((row) => {
      const details = row.split(',');
      if (details.length < 4 || !details[0]) return; // Ignore invalid rows

      const firstName = details[0];
      const field = details[3];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    });

    // Log total number of students
    const totalStudents = Object.values(fields).reduce((sum, names) => sum + names.length, 0);
    console.log(`Number of students: ${totalStudents}`);

    // Log number of students per field and their names
    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
