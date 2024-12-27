const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Database connection
const db = mysql.createConnection({
    host: 'cpn.cvqw6q624prq.us-east-1.rds.amazonaws.com',
    user: 'admin', // Replace with your username
    password: 'P24.08.2004', // Replace with your password
    database: 'cpn', // Replace with your database name
});

// Register new user
app.post('/register', async (req, res) => {
    const { email, forename, surname, birthday, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (email, forename, surname, birthday, password) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [email, forename, surname, birthday, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Error registering user.' });
            }
            res.status(200).send({ message: 'User registered successfully.' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error processing registration.' });
    }
});

// Login user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT password FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send({ message: 'Invalid email or password.' });
        }

        const validPassword = await bcrypt.compare(password, results[0].password);
        if (validPassword) {
            res.cookie('session', email, { httpOnly: true, maxAge: 3600000 }); // 1-hour session
            res.status(200).send({ message: 'Login successful.' });
        } else {
            res.status(400).send({ message: 'Invalid email or password.' });
        }
    });
});

// Logout user
app.post('/logout', (req, res) => {
    res.clearCookie('session');
    res.status(200).send({ message: 'Logged out successfully.' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
