const express = require('express');
const router = express.Router();
const User = require('../models/user');

//login
router.post('/login-35495146', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) 
      return res.status(404).json({ error: 'User not found' });
    if (user.password !== password) 
      return res.status(401).json({ error: 'Invalid password' });

    user.isLoggedIn = true;
    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

//logout
router.post('/logout-35495146', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) 
      return res.status(400).json({ error: 'Missing userId' });

    const user = await User.findOne({ userId });
    if (!user) 
      return res.status(404).json({ error: 'User not found' });

    user.isLoggedIn = false;
    await user.save();

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Logout failed' });
  }
});

//authenticate
router.get('/check-auth-35495146/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) 
      return res.status(404).json({ loggedIn: false, error: 'User not found' });

    res.json({ loggedIn: user.isLoggedIn, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ loggedIn: false, error: 'Server error' });
  }
});

module.exports = router;
