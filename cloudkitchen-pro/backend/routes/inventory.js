const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

// next inventoryId
async function generateInventoryId() {
  const latest = await Inventory.findOne().sort({ createdDate: -1 });
  let nextNum = 1;

  if (latest && latest.inventoryId) {
    const parts = latest.inventoryId.split('-');
    if (parts.length === 2 && /^\d+$/.test(parts[1])) {
      nextNum = parseInt(parts[1], 10) + 1;
    }
  }
  return `I-${String(nextNum).padStart(5, '0')}`;
}

// add inventory
router.post('/add-inventory-35495146', async (req, res) => {
  try {
    const { userId, ingredientName, quantity, unit, category, purchaseDate, expirationDate, location, cost } = req.body;

    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const inventoryId = await generateInventoryId();

    const newItem = await Inventory.create({
      inventoryId,
      userId,
      ingredientName,
      quantity,
      unit,
      category,
      purchaseDate,
      expirationDate,
      location,
      cost
    });

    res.json({ success: true, item: newItem });
  } catch (err) {
    console.error('Add inventory error:', err);
    res.status(400).json({ error: err.message || 'Failed to add inventory' });
  }
});

// list of inventory
router.get('/inventory-35495146', async (req, res) => {
  try {
    const { userId, inventoryId } = req.query;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    if (inventoryId) {
      const item = await Inventory.findOne({ userId, inventoryId });
      if (!item) return res.status(404).json({ error: 'Item not found' });
      return res.json({ success: true, item });
    }

    const items = await Inventory.find({ userId });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update the inventory
router.put('/edit-inventory-35495146', async (req, res) => {
  try {
    const { inventoryId, userId, ...updates } = req.body;
    if (!inventoryId || !userId) return res.status(400).json({ error: 'Missing inventoryId or userId' });

    const updated = await Inventory.findOneAndUpdate({ inventoryId, userId }, updates, { new: true });
    if (!updated) return res.status(404).json({ error: 'Item not found' });

    res.json({ success: true, item: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// dlete inventory
router.delete('/delete-inventory-35495146', async (req, res) => {
  try {
    const { inventoryId, userId } = req.query;
    if (!inventoryId || !userId) return res.status(400).json({ error: 'Missing inventoryId or userId' });

    const deleted = await Inventory.findOneAndDelete({ inventoryId, userId });
    if (!deleted) return res.status(404).json({ error: 'Item not found' });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
