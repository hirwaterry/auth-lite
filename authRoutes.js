const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./userModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Missing fields');
  
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).send('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, password: hashed });

    req.session.userId = user._id;
    res.status(201).json({ message: 'Registered', user: { username: user.username } });
  } catch (err) {
    res.status(500).send('Error registering');
  }
}); 

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Missing fields');

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Invalid credentials');

    req.session.userId = user._id;
    delete user.password;
    res.json({ message: 'Logged in', user });
  } catch {
    res.status(500).send('Error logging in');
  }
});

router.get('/me', (req, res) => {
  if (req.session && req.session.user) {
    const { _id, username, email } = req.session.user;
    res.json({ id: _id, username, email });
  } else {
    res.json(null);
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.send('Logged out');
  });
});

module.exports = router;
