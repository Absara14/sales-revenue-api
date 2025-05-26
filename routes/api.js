const express = require('express');
const Order = require('../models/Order');
const loadCSV = require('../services/loadCSV');
const Product = require('../models/Product');

const router = express.Router();



// Trigger CSV Load
router.post('/refresh', async (req, res) => {
  const result = await loadCSV('uploads/sales.csv');
  if (result.success) {
    res.status(200).json({ message: 'Data refreshed successfully' });
  } else {
    res.status(500).json({ error: result.error });
  }
});


// Revenue Calculation
router.get('/revenue', async (req, res) => {
  const { start, end } = req.query;
  try {
    const orders = await Order.find({
      dateOfSale: {
        $gte: new Date(start),
        $lte: new Date(end)
      }
    });

    const totalRevenue = orders.reduce((sum, o) => {
      const gross = o.unitPrice * o.quantitySold;
      const discount = gross * o.discount;
      return sum + (gross - discount);
    }, 0);

    res.json({ totalRevenue: totalRevenue.toFixed(2) });
  } catch (err) {
    res.status(500).json({ error: 'Revenue calculation failed' });
  }
});


// Revenue Grouped by Product
router.get('/revenue/by-product', async (req, res) => {
  const { start, end } = req.query;
  try {
    const orders = await Order.find({
      dateOfSale: { $gte: new Date(start), $lte: new Date(end) }
    });

    // Aggregate revenue by productId
    const revenueByProduct = {};

    orders.forEach(o => {
      const gross = o.unitPrice * o.quantitySold;
      const discount = gross * o.discount;
      const netRevenue = gross - discount;

      revenueByProduct[o.productId] = (revenueByProduct[o.productId] || 0) + netRevenue;
    });

    // Get product names
    const productIds = Object.keys(revenueByProduct);
    const products = await Product.find({ _id: { $in: productIds } });

    const result = products.map(p => ({
      product: p.name,
      revenue: parseFloat(revenueByProduct[p._id].toFixed(2))
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate revenue by product' });
  }
});

// Revenue Grouped by Category
router.get('/revenue/by-category', async (req, res) => {
  const { start, end } = req.query;
  try {
    const orders = await Order.find({
      dateOfSale: { $gte: new Date(start), $lte: new Date(end) }
    });

    // Aggregate revenue by categoryId
    const revenueByCategory = {};

    for (const o of orders) {
      const product = await Product.findById(o.productId);
      if (!product) continue;

      const gross = o.unitPrice * o.quantitySold;
      const discount = gross * o.discount;
      const netRevenue = gross - discount;

      revenueByCategory[product.category] = (revenueByCategory[product.category] || 0) + netRevenue;
    }

    const result = Object.entries(revenueByCategory).map(([category, revenue]) => ({
      category,
      revenue: parseFloat(revenue.toFixed(2))
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate revenue by category' });
  }
});
module.exports = router;
