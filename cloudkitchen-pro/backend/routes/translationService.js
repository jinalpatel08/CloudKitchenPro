const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const User = require('../models/user');
require('dotenv').config();

const { Translate } = require('@google-cloud/translate').v2;

// google translate setup
const translate = new Translate({ projectId: process.env.GOOGLE_PROJECT_ID });

router.post('/translate-recipe-35495146', async (req, res) => {
  try {
    const { recipeId, userId, targetLang } = req.body;

    // basic validation
    if (!recipeId || !userId || !targetLang) {
      return res.status(400).json({ success: false, error: 'missing some fields' });
    }

    // make sure user exists and logged in
    const user = await User.findOne({ userId });
    if (!user || !user.isLoggedIn) {
      return res.status(401).json({ success: false, error: 'user not logged in' });
    }

    // find recipe
    const recipe = await Recipe.findOne({ recipeId, userId });
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'recipe not found in db' });
    }

    const { title, ingredients, instructions } = recipe;

    // join ingredients & instructions properly
    const ingredientsText = Array.isArray(ingredients)
      ? ingredients.join(', ')
      : String(ingredients);

    const instructionsText = Array.isArray(instructions)
      ? instructions.join('. ')
      : String(instructions);

    // do translations
    const [translatedTitle] = await translate.translate(title, targetLang);
    const [translatedIngredients] = await translate.translate(ingredientsText, targetLang);
    const [translatedInstructions] = await translate.translate(instructionsText, targetLang);

    const translatedRecipe = {
      translatedTitle,
      translatedIngredients,
      translatedInstructions,
      targetLang
    };

    console.log(`recipe ${recipeId} translated to ${targetLang}`);

    return res.json({ success: true, translatedRecipe });

  } catch (err) {
    console.error('error during translation:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'could not translate recipe right now'
    });
  }
});

module.exports = router;
