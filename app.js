// Import the express module
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname isn't built in with ES modules, so recreate it
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create an instance of an Express application
const app = express();

let contactForm = [];

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Use Digital Ocean's port if provided, otherwise 3002
const PORT = process.env.PORT || 3002;

// Serve static files (CSS, favicon) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Read form data from POST requests into req.body
app.use(express.urlencoded({ extended: true }));

// Define the root path ('/') and send the contact form
app.get('/', (req, res) => {
    res.render('home');
});

// Define the confirm path
app.get('/confirm', (req, res) => {
    res.render('confirm');
});


// Form submission route
app.post('/submit', (req, res) => {
    
    req.body.timestamp = new Date();

    contactForm.push(req.body);

    res.redirect('/confirm');
});

// admin route 
app.get('/admin', (req, res) => {
    res.render('admin', { contactForm });
});


// Start the server and tell it to listen on the port above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});