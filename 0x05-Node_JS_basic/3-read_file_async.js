const fs = require('fs').promises;


function countStudents(path) {
    const data = fs.readFile(path, 'utf8');

    return fs.readFile(path, 'utf8')
        .then((data) => {
             // Read the file synchronously
            const rows = data.split('\n').filter((line) => line.trim() !== ''); // Split into rows and ignore empty lines

            if (rows.length <= 1) {
                process.stdout.write('Number of students: 0');
                return;
            }

            // Parse the header and the rows
            const header = rows[0].split(','); // Extract headers (not used directly here)
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
            process.stdout.write(`Number of students: ${totalStudents}`);

            // Log number of students per field and their names
            for (const [field, names] of Object.entries(fields)) {
                process.stdout.write(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
            }
        })
        .catch((error) => {
            throw new Error(`Cannot load the database`);
        });
}

module.exports = countStudents;
