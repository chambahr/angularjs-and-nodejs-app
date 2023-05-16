const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

// Middleware
app.use(bodyParser.json());

// Mock data for product list
let productList = [
  { id: 1, name: 'Product 1', price: 10.99 },
  { id: 2, name: 'Product 2', price: 19.99 },
];

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
};

// Mock user for authentication
const mockUser = {
  id: 1,
  username: 'admin',
  password: bcrypt.hashSync('admin123', 10),
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && bcrypt.compareSync(password, mockUser.password)) {
    const token = generateToken(mockUser);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected route example
app.get('/protected', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'Token not provided' });
  } else {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        // Access granted, handle the protected route logic here
        res.json({ message: 'Protected route accessed successfully' });
      }
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
