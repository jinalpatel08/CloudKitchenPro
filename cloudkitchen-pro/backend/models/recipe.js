const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
    unique: true,
    match: /^R-\d{5}$/
  },
  userId: {
    type: String,
    required: true,
    match: /^U-\d{5}$/
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  chef: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    match: /^[a-zA-Z\s'-]+$/ //no numbers or special characters except spaces, hyphens, and apostrophes
  },
  ingredients: {
    type: [mongoose.Schema.Types.Mixed], //An array of mixed objects, because it has unit, name, quantity
    required: true,
    validate: [v => v.length >= 1 && v.length <= 20, 'Invalid ingredient count']
  },
  instructions: {
    type: [String],
    required: true,
    validate: [v => v.length >= 1 && v.length <= 15 && v.every(step => step.length >= 10), 'Invalid instruction format']
  },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    required: true
  },
  cuisineType: {
    type: String,
    enum: ['Italian', 'Asian', 'Mexican', 'American', 'French', 'Indian', 'Mediterranean', 'Other'],
    required: true
  },
  prepTime: {
    type: Number,
    required: true,
    min: 1,
    max: 480
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  servings: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  createdDate: {
    type: Date,
    required: true,
    validate: {
      validator: v => v <= new Date(),
      message: 'Created date cannot be in the future'
    }
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
