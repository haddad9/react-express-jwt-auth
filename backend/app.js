// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');

const secretKey = 'your-secret-key';

app.use(express.json());
app.use(cors());

// User model and registration endpoint
const users = [];

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const newUser = { email, password };
  users.push(newUser);
  res.status(200).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ email }, secretKey);
  res.status(200).json({ token });
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  
 
  res.status(200).json({ message: "You are authorized to access /protected with JWT "});
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    req.user = user;
    next();
  });
}

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
