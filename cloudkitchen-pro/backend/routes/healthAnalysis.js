const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const User = require('../models/user');
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Gemini setup (Google AI)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/analyze-health-35495146', async (req, res) => {
  try {
    const { recipeId, userId } = req.body;

    // check if data is missing
    if (!recipeId || !userId) {
      return res.status(400).json({ success: false, error: 'recipeId or userId missing' });
    }

    // find user and make sure they’re logged in
    const user = await User.findOne({ userId });
    if (!user || !user.isLoggedIn) {
      return res.status(401).json({ success: false, error: 'user not logged in' });
    }

    // find recipe for that user
    const recipe = await Recipe.findOne({ recipeId, userId });
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'recipe doesn’t exist' });
    }

    // handle ingredients format (array or string)
    const ingredientsString = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join(', ')
      : String(recipe.ingredients);

    // prompt for Gemini to analyze
    const prompt = `
    Analyze how healthy this recipe is and give some quick suggestions to make it better.
    Ingredients: ${ingredientsString}.
    Please give a health score out of 100, note any issues, and short advice to improve.
    `;

    console.log('Sending to Gemini', prompt);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);

    const response = result.response;
    const answer = response.text();

    console.log('Gemini gave this response:', answer);

    // success response
    return res.json({
      success: true,
      analysis: answer,
      provider: 'Google Gemini'
    });

  } catch (err) {
    console.error('something went wrong in health analysis:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'could not complete health analysis'
    });
  }
});

module.exports = router;
