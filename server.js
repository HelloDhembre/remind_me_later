const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rao@123', 
  database: 'remind_me_later'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

// Create reminders table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  message VARCHAR(255) NOT NULL,
  method ENUM('SMS', 'Email') NOT NULL
);
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating reminders table:', err);
    process.exit(1);
  }
  console.log('Reminders table is ready');
});

// POST /reminders endpoint to save a reminder
app.post('/reminders', (req, res) => {
  const { date, time, message, method } = req.body;

  if (!date || !time || !message || !method) {
    return res.status(400).json({ error: 'Missing required fields: date, time, message, method' });
  }

  if (!['SMS', 'Email'].includes(method)) {
    return res.status(400).json({ error: 'Invalid method. Supported methods are SMS and Email' });
  }

  const insertQuery = 'INSERT INTO reminders (date, time, message, method) VALUES (?, ?, ?, ?)';
  db.query(insertQuery, [date, time, message, method], (err, result) => {
    if (err) {
      console.error('Error inserting reminder:', err);
      return res.status(500).json({ error: 'Failed to save reminder' });
    }
    res.status(201).json({ message: 'Reminder saved successfully', reminderId: result.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Remind Me Later API listening at http://localhost:${port}`);
});
