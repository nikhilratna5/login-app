const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Dummy valid credentials
const VALID_CREDENTIALS = {
  username: "admin",
  password: "password123"
};

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Handle login requests
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    res.send("<h1>Login successful!</h1>");
  } else {
    const invalidAttempt = `Invalid login attempt: Username: ${username}, Password: ${password}, Timestamp: ${new Date().toISOString()}\n`;

    // Log invalid attempt to a file
    fs.appendFile('invalid_logins.txt', invalidAttempt, (err) => {
      if (err) {
        console.error("Error logging invalid attempt:", err);
      }
    });

    res.send("<h1>Invalid credentials. Your attempt has been logged.</h1>");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});