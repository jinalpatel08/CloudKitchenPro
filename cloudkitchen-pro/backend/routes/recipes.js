const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const User = require('../models/user');

// next recipeId
async function nextRecipeId() {
  const last = await Recipe.findOne().sort({ createdDate: -1 });
  let next = 1;
  if (last && /^R-\d{5}$/.test(last.recipeId)) {
    next = parseInt(last.recipeId.split('-')[1]) + 1;
  }
  return `R-${String(next).padStart(5, '0')}`;
}

// list of all recipes
router.get('/recipes-35495146', async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findOne({ userId });
    if (!user || !user.isLoggedIn)
      return res.status(403).json({ success: false, error: 'User not logged in' });

    const recipes = await Recipe.find({ userId }).sort({ createdDate: -1 });
    res.json({ success: true, recipes });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch recipes' });
  }
});

//add a new recipe
router.post('/add-recipe-35495146', async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ userId });
    if (!user || !user.isLoggedIn)
      return res.status(403).json({ success: false, error: 'User not logged in' });

    const recipeId = await nextRecipeId();
    const recipe = await Recipe.create({
      recipeId,
      userId,
      title: req.body.title,
      chef: req.body.chef,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      mealType: req.body.mealType,
      cuisineType: req.body.cuisineType,
      prepTime: req.body.prepTime,
      difficulty: req.body.difficulty,
      servings: req.body.servings,
      createdDate: new Date()
    });

    res.json({ success: true, recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to add recipe' });
  }
});

// edit a recipe
router.put('/edit-recipe-35495146', async (req, res) => {
  try {
    const { recipeId, userId } = req.body;
    const recipe = await Recipe.findOneAndUpdate(
      { recipeId, userId },
      req.body,
      { new: true }
    );
    if (!recipe)
      return res.status(404).json({ success: false, error: 'Recipe not found' });

    res.json({ success: true, recipe });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update recipe' });
  }
});

// delete a recipe
router.delete('/delete-recipe-35495146', async (req, res) => {
  try {
    const { recipeId, userId } = req.query;
    const result = await Recipe.deleteOne({ recipeId, userId });
    if (result.deletedCount === 0)
      return res.status(404).json({ success: false, error: 'Recipe not found' });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete recipe' });
  }
});

// Get single recipe by ID
router.get('/recipe-35495146', async (req, res) => {
  try {
    const { recipeId, userId } = req.query;
    const user = await User.findOne({ userId });
    if (!user || !user.isLoggedIn)
      return res.status(403).json({ success: false, error: 'User not logged in' });

    const recipe = await Recipe.findOne({ recipeId, userId });
    if (!recipe)
      return res.status(404).json({ success: false, error: 'Recipe not found' });

    res.json({ success: true, recipe });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch recipe' });
  }
});

module.exports = router;
