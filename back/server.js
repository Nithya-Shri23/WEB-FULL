// Importing required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'contact_form_db'
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to handle form submission
app.post('/submit-contact-form', (req, res) => {
  const { name, email, message } = req.body;

  // Prepare the SQL query to insert form data
  const query = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';

  // Execute the query to insert the data
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.status(200).send('Message sent successfully');
  });
});

app.get('/get-messages', (req, res) => {
  const query = 'SELECT * FROM contact_messages ORDER BY date DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      res.status(500).send('Error fetching messages');
      return;
    }
    res.status(200).json(results);  // Send the messages as a JSON response
  });
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
