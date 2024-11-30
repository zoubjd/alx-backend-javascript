const express = require('express');
const fs = require('fs').promises;

// Retrieve the database name from the command-line arguments
const dbName = process.argv[2];
const app = express();

/**
 * Asynchronously counts the students in the CSV file and groups them by field.
 * @param {string} path - The path to the CSV file.
 * @returns {Promise<string>} - A promise that resolves to a formatted string with the student details.
 */
async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const rows = data.split('\n').filter((line) => line.trim() !== ''); // Remove empty lines

    if (rows.length <= 1) {
      return 'Number of students: 0';
    }

    const students = rows.slice(1); // Skip the header row
    const fields = {}; // Object to group students by field

    students.forEach((row) => {
      const details = row.split(',');
      if (details.length < 4 || !details[0]) return; // Skip invalid rows

      const firstName = details[0];
      const field = details[3];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    });

    const totalStudents = Object.values(fields).reduce((sum, names) => sum + names.length, 0);
    let result = `Number of students: ${totalStudents}\n`;

    // Format the details for each field
    for (const [field, names] of Object.entries(fields)) {
      result += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    }

    return result.trim(); // Remove any trailing newline
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

// Define the root route
app.get('/', (req, res) => {
  res.status(200).send('Hello Holberton School!');
});

// Define the /students route
app.get('/students', async (req, res) => {
  try {
    const header = 'This is the list of our students\n';
    const studentData = await countStudents(dbName);
    res.status(200).send(`${header}${studentData}`);
  } catch (error) {
    res.status(500).send('This is the list of our students\nCannot load the database');
  }
});

// Start the server
app.listen(1245, () => {
  console.log('Server is running on http://localhost:1245');
});

// Export the app for testing or further use
module.exports = app;
