const express = require('express');
const fs = require('fs').promises;

// Retrieve the database name from the command-line argument
const dbname = process.argv[2];
const app = express();

async function countStudents(path, res) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const rows = data.split('\n').filter((line) => line.trim() !== ''); // Ignore empty lines

    if (rows.length <= 1) {
      res.write('Number of students: 0\n');
      res.end(); // Ensure the response ends
      return;
    }

    const students = rows.slice(1); // Skip the header row
    const fields = {}; // Group students by field

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

    const totalStudents = Object.values(fields).reduce((sum, names) => sum + names.length, 0);

    // Write the total number of students
    res.write(`Number of students: ${totalStudents}\n`);

    // Write the details for each field
    for (const [field, names] of Object.entries(fields)) {
      res.write(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`);
    }

    // End the response
    res.end();
  } catch (error) {
    res.write('Cannot load the database\n');
    res.end(); // Ensure the response ends
  }
}

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define the /students route
app.get('/students', (req, res) => {
  countStudents(dbname, res);
});

// Start the server
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
