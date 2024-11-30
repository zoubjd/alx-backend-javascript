const http = require('http');

const dbname = process.argv[2];
const fs = require('fs').promises;

async function countStudents(path, res) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const rows = data.split('\n').filter((line) => line.trim() !== ''); // Ignore empty lines

    if (rows.length <= 1) {
      res.write('Number of students: 0\n');
      res.end(); // End response here for empty database
      return;
    }

    const students = rows.slice(1); // Skip header row
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

    // Write data to response
    res.write(`Number of students: ${totalStudents}\n`);
    for (const [field, names] of Object.entries(fields)) {
      res.write(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`);
    }
    res.end(); // End response after writing all data
  } catch (error) {
    res.write('Cannot load the database\n');
    res.end(); // End response in case of an error
  }
}

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n'); // Header message
    countStudents(dbname, res); // Handle response in countStudents
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(1245);

module.exports = server;
