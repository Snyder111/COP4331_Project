const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5700190',
  password: 'KLk8Zr8C7N',
  database: 'sql5700190'
});

// Log when connection is established
connection.connect();

// Log if connection is lost
connection.query('*COMMAND GOES HERE*', (err, result, fields) => {
    if (err) throw err
    //Do things with result and fields (mainly result)
  });
  
  connection.end();



function doSignUp(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Collect input values
    const Username = document.getElementById('Username').value;
    const Password = document.getElementById('Password').value;
    // Basic validation example
    if (!Username || !Password) {
        document.getElementById('message').innerHTML = '<p>All fields are required.</p>';
        return;
    }
    document.getElementById('message').innerHTML = '<p>Registering... Please wait.</p>';
    // Perform INSERT query to insert user registration data into MySQL database
    const sql = "INSERT INTO users (Username, Password, PremiumToken, Chips) VALUES (?, ?, NULL, 1000)";
    
    // Retrieve the last UserID and increment it
   
}