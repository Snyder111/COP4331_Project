const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5700190',
  password: 'KLk8Zr8C7N',
  database: 'sql5700190'
});

connection.connect();

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('registrationForm').addEventListener('submit', function(event){
        doSignUp(event);
    });
});

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
    const sql = "INSERT INTO users (UserID, Username, Password, PremiumToken, Chips) VALUES (?, ?, ?, NULL, 1000)";
    
    // Retrieve the last UserID and increment it
    connection.query("SELECT MAX(UserID) AS maxUserID FROM users", (err, rows) => {
        if (err) {
            console.error('Failed to retrieve max UserID', err);
            document.getElementById('message').innerHTML = '<p>Registration failed. Please try again.</p>';
            return;
        }
        
        const maxUserID = rows[0].maxUserID || 0; // If no users exist, set maxUserID to 0
        const newUserID = maxUserID + 1;
        
        // Execute the INSERT query with the newUserID
        connection.query(sql, [newUserID, Username, Password], (err, result) => {
            if (err) {
                console.error('Registration Failed', err);
                document.getElementById('message').innerHTML = '<p>Registration failed. Please try again.</p>';
            } else {
                console.log('Registration Successful', result);
                document.getElementById('message').innerHTML = '<p>Registration successful. Please <a href="login.html">login</a>.</p>';
            }
        });
    });
}