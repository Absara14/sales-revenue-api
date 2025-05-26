const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

const LOG_PATH = path.join(__dirname, '../logs/refresh.log');

function log(message) {
  fs.appendFileSync(LOG_PATH, `${new Date().toISOString()} - ${message}\n`);
}

async function loadCSV(filepath) {
  try {
    const results = [];

    const stream = fs.createReadStream(filepath)
      .pipe(csv());

    for await (const row of stream) {
      results.push(row);
    }

    for (const row of results) {
      // Insert/update customer
      await Customer.updateOne(
        { customerId: row['Customer ID'] },
        {
          name: row['Customer Name'],
          email: row['Customer Email'],
          address: row['Customer Address']
        },
        { upsert: true }
      );

      // Insert/update product
      await Product.updateOne(
        { productId: row['Product ID'] },
        {
          name: row['Product Name'],
          category: row['Category']
        },
        { upsert: true }
      );

      // Insert/update order
      await Order.updateOne(
        { orderId: row['Order ID'] },
        {
          productId: row['Product ID'],
          customerId: row['Customer ID'],
          region: row['Region'],
          dateOfSale: new Date(row['Date of Sale']),
          quantitySold: Number(row['Quantity Sold']),
          unitPrice: Number(row['Unit Price']),
          discount: Number(row['Discount']),
          shippingCost: Number(row['Shipping Cost']),
          paymentMethod: row['Payment Method']
        },
        { upsert: true }
      );
    }

    log('CSV loaded successfully.');
    return { success: true };
  } catch (err) {
    log(`Error: ${err.message}`);
    return { success: false, error: err.message };
  }
}

module.exports = loadCSV;
