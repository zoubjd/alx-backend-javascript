import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(req, res) {
    const database = req.app.locals.database;

    try {
      const fields = await readDatabase(database);
      const response = ['This is the list of our students'];
      Object.keys(fields)
        .sort((a, b) => a.localeCompare(b))
        .forEach((field) => {
          const count = fields[field].length;
          const list = fields[field].join(', ');
          response.push(`Number of students in ${field}: ${count}. List: ${list}`);
        });

      res.status(200).send(response.join('\n'));
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const database = req.app.locals.database;
    const { major } = req.params;

    if (!['CS', 'SWE'].includes(major)) {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const fields = await readDatabase(database);
      const students = fields[major] || [];
      res.status(200).send(`List: ${students.join(', ')}`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

export default StudentsController;
