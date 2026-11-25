// Import the express module
import express from 'express';

// Import the mysql2 module
import mysql2 from 'mysql2';

// Import .env
import dotenv from 'dotenv';
dotenv.config();

// Import server-side validation
import {validateForm} from './validation.js';


// Create a connection pool to the MySQL database
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Create an instance of an Express application
const app = express();

let contactForm = [];

// Set the view engine to EJS
app.set('view engine', 'ejs');

const PORT = 3002;

// Enable static file serving
app.use(express.static('public'));

// Read form data from POST requests into req.body
app.use(express.urlencoded({ extended: true }));

// Define the root path ('/') and send the contact form
app.get('/', (req, res) => {
    res.render('home');
});

// Define the contact path
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Define the confirm path
app.get('/confirm', (req, res) => {
    res.render('confirm');
});

// Define the portfolio path
app.get('/portfolio', (req, res) => {
    res.render('portfolio');
});


// Form submission route
app.post('/submit', async (req, res) => {
    const contact = req.body;
    contact.timestamp = new Date();

    contact.mailing = contact.mailing ? 1 : 0;

    const valid = validateForm(contact);
    if(!valid.isValid){
        console.log(valid);
        res.render('home', {errors: valid.errors});
        return;
    }

    const sql = `INSERT INTO contacts
        (first, last, job, company, linkedin, email, meet, other, message, mailing, format)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        contact.first,
        contact.last,
        contact.job,
        contact.company,
        contact.linkedin,
        contact.email,
        contact.meet,
        contact.other,
        contact.message,
        contact.mailing,
        contact.format
    ];

    try {
        // Execute the Query
        const [result] = await pool.execute(sql, params);

        contact.id = result.insertId;
        console.log("A new row was inserted with id:" + contact.id);

        res.render('confirm', { contact });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).send('Database Error Occured');
    }
});

// admin route 
app.get('/admin', async (req, res) => {
    try {
        const [contactForm] = await pool.query('SELECT * FROM contacts');
        console.log(contactForm);
        res.render('admin', { contactForm });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).send('Database Error Occured');
    }
});


// Start the server and tell it to listen on the port above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});