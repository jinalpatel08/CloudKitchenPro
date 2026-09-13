const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  inventoryId: {
    type: String,
    required: true,
    unique: true,
    match: /^I-\d{5}$/ // I followed by 5 digits
  },
  userId: {
    type: String,
    required: true,
    match: /^U-\d{5}$/ // U followed by 5 digits
  },
  ingredientName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    match: /^[a-zA-Z\s-]+$/ // letters, spaces, hyphens
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.01,
    max: 9999
  },
  unit: {
    type: String,
    enum: ['pieces', 'kg', 'g', 'liters', 'ml', 'cups', 'tbsp', 'tsp', 'dozen'],
    required: true
  },
  category: {
    type: String,
    enum: ['Vegetables', 'Fruits', 'Meat', 'Dairy', 'Grains', 'Spices', 'Beverages', 'Frozen', 'Canned', 'Other'],
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true,
    validate: {
      validator: v => v <= new Date(),
      message: 'Purchase date cannot be in the future'
    }
  },
  expirationDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return v > this.purchaseDate;
      },
      message: 'Expiration date must be after purchase date'
    }
  },
  location: {
    type: String,
    enum: ['Fridge', 'Freezer', 'Pantry', 'Counter', 'Cupboard'],
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0.01,
    max: 999.99
  },
  createdDate: {
    type: Date,
    default: Date.now,
    validate: {
      validator: v => v <= new Date(),
      message: 'Created date cannot be in the future'
    }
  }
});

module.exports = mongoose.model('Inventory', inventorySchema);
