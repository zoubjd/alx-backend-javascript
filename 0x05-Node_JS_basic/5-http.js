const http = require('http');
const fs = require('fs').promises;

// Get the database file name from the command line arguments
const dbName = process.argv[2];

/**
 * Asynchronously counts the students in the CSV file and groups them by field.
 * Writes the result directly to the HTTP response.
 * @param {string} path - The path to the CSV file.
 * @param {object} res - The HTTP response object.
 */
async function countStudents(path, res) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const rows = data.split('\n').filter((line) => line.trim() !== ''); // Remove empty lines

    if (rows.length <= 1) {
      res.write('Number of students: 0\n');
      res.end(); // End the response for an empty database
      return;
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

    // Write the output to the HTTP response
    res.write(`Number of students: ${totalStudents}\n`);
    for (const [field, names] of Object.entries(fields)) {
      res.write(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`);
    }
    res.end(); // End the response after processing
  } catch (error) {
    res.write('Cannot load the database\n');
    res.end(); // End the response in case of an error
  }
}

// Create the HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n'); // Initial header
    countStudents(dbName, res); // Process the student data
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Listen on port 1245
server.listen(1245, () => {
  console.log('Server is running on http://localhost:1245');
});

// Export the server for testing or other usage
module.exports = server;
