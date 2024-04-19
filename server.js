const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3306;

const connection = mysql.createConnection({
    host: 'sql5.freesqldatabase.com',
    user: 'sql5700190',
    password: 'KLk8Zr8C7N',
    database: 'sql5700190'
});

app.use(express.json());

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    connection.query('INSERT INTO users (Username, Password, PremiumToken, Chips) VALUES (?, ?, NULL, 1000)', [username, password], (error, results) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Registration failed. Please try again.' });
        }

        console.log('Registration successful');
        return res.status(200).json({ message: 'Registration successful. Please login.' });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});