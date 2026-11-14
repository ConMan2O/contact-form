// Import the express module
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create an instance of an Express application
const app = express();

let contactForm = [];

// Set the view engine to EJS
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3002;

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


// Form submission route
app.post('/submit', (req, res) => {
    const contact = req.body;
    contact.timestamp = new Date();

    contactForm.push(contact);

    res.render('confirm', { contact });
});

// admin route 
app.get('/admin', (req, res) => {
    res.render('admin', { contactForm });
});


// Start the server and tell it to listen on the port above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});