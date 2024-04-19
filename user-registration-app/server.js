const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// MySQL database connection
const connection = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5700190',
  password: 'KLk8Zr8C7N',
  database: 'sql5700190'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON requests
app.use(express.json());

// Route for serving the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

// Route for user registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO Users (Username, Password, PremiumToken, Chips) VALUES (?, ?, NULL, 1000)';
  
  console.log(`Attempting to register user: ${username}`); // Log before attempting to insert

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ message: 'An error occurred. Please try again later.', error: err.message });
    }
    console.log('User registered successfully:', result); // Log the result on success
    res.json({ success: true, message: 'User registered successfully' }); // Include success property in the response
  });
});

// ... (other setup code remains unchanged)

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route for serving the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

// Route for serving the login.html file
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});



app.post('/login', (req, res) => {
  const { Username, Password } = req.body;
  console.log('Received login request with Username:', Username, 'and Password:', Password); // Log the request body
  const query = "SELECT * FROM `Users` WHERE Username = ? AND Password = ?";
  
  connection.query(query, [Username, Password], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'An error occurred. Please try again later.', error: err.message });
    }
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      console.log('Invalid username or password:', Username, Password); // Log the username and password
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

// ... (other routes and middleware)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});





