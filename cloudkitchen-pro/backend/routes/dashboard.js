const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Recipe = require('../models/recipe');
const Inventory = require('../models/inventory');

// GET /api/dashboard-35495146?userId=U-00001
router.get('/dashboard-35495146', async (req, res) => {
  try {
    const { userId } = req.query;

    // Validate query parameter for user id
    if (!userId) {
      return res.status(400).json({ success: false, error: 'Missing userId query parameter.' });
    }

    // Verify if user exists and login status
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }
    if (!user.isLoggedIn) {
      return res.status(403).json({ success: false, error: 'User is not logged in.' });
    }

    // calculatedashboard statistics 
    const [userCount, recipeCount, inventoryCount] = await Promise.all([
      User.countDocuments(),
      Recipe.countDocuments({ userId }),
      Inventory.countDocuments({ userId })
    ]);

    //the data
    res.json({
      success: true,
      stats: {
        totalUsers: userCount,
        totalRecipes: recipeCount,
        totalInventory: inventoryCount,
        fullname: user.fullname,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ success: false, error: 'Failed to load dashboard stats.' });
  }
});

module.exports = router;
