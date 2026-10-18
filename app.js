// Import the express module
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname isn't built in with ES modules, so recreate it
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create an instance of an Express application
const app = express();

// Use Digital Ocean's port if provided, otherwise 3002
const PORT = process.env.PORT || 3002;

// Serve static files (CSS, favicon) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Define the root path ('/') and send the contact form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server and tell it to listen on the port above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});