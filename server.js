const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'user_details',
  connectionLimit: 10,
});

// Helper function to hash passwords
const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

// Registration endpoint
app.post('/register', async (req, res) => {
  const { name, email, password, phoneNumber, schoolName, address } = req.body;

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Log the hashed password
  console.log('Hashed Password:', hashedPassword);

  // Perform validation as needed

  const query = 'INSERT INTO users (name, email, password, phoneNumber, schoolName, address) VALUES (?, ?, ?, ?, ?, ?)';

  pool.query(query, [name, email, hashedPassword, phoneNumber, schoolName, address], (error, results) => {
    if (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
    res.status(201).json({ success: true });
  });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';

  pool.query(query, [email], async (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ error: 'Internal server error. Please try again.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found.' });
    }

    const user = results[0];

    // Log the entered and stored passwords
    console.log('Entered Password:', password);
    console.log('Stored Password:', user.password);

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.error('Invalid password:', password, user.password);
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Login successful
    res.status(200).json({ success: true, user });
  });
});

// Handle requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the user_details API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
