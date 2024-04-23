const express = require('express');
const mysql = require('mysql');
const path = require('path');
const ejs = require('ejs');

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
app.set('view engine', 'ejs');
// Set the directory for views
app.set('views', path.join(__dirname, 'views'));

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

app.get('/upgrade.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'upgrade.html'));
});

app.get('/upgrade_success.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'upgrade_success.html'));
});

app.get('/premium_dash.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'premium_dash.html'));
});

app.get('/account_mgmt.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'account_mgmt.html'));
});


let loggedInUser = null;


app.post('/login', (req, res) => {
  const { Username, Password } = req.body;
  console.log('Received login request with Username:', Username, 'and Password:', Password); // Log the request body
  const query = "SELECT * FROM `Users` WHERE Username = ? AND Password = ?";
  console.log('here1')
  
  connection.query(query, [Username, Password], (err, results) => {
    console.log('here2')
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'An error occurred. Please try again later.', error: err.message });
    }
    if (results.length > 0) {
      console.log('here3')
      loggedInUser = results[0]; // Store the logged-in user's information
      console.log('Logged in user:', loggedInUser);
      res.json({ success: true, message: 'Login successful' });
      console.log('here4')

      

      
    } else {
      console.log('Invalid username or password:', Username, Password); // Log the username and password
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

// ... (other routes and middleware)
// Set the view engine to EJS


app.get('/dashboard', (req, res) => {
  // Assuming loggedInUser is properly defined
  if (loggedInUser) {
    // Assuming you've set up the template engine (e.g., EJS)
    res.render('dashboard', { Username: loggedInUser.Username, Chips: loggedInUser.Chips });
  } else {
    res.status(401).send('Unauthorized');
  }
});



app.post('/getCars', (request, response) => {
  connection.query('SELECT * FROM Cars ORDER BY id DESC LIMIT 10;', (err, result, fields) => {
      if (err) throw err
      response.status(200).json(result);
  });
});

app.post('/getAll', (request, response) => {
  connection.query('SELECT * FROM Cars', (err, result, fields) => {
      if (err) throw err
      response.status(200).json(result);
  });
});

app.post('/getWinners', (request, response) => {
  connection.query('SELECT * FROM Races', (err, result, fields) => {
      if (err) throw err
      response.status(200).json(result);
  });
});




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});





