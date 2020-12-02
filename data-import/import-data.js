const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const Product = require('../models/product');

dotenv.config({ path: '../.env' });

const DB = process.env.db;

console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfully!');
  });

// READ_FILE
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
);

// Import Data Into DB

const importData = async () => {
  try {
    await Product.create(products);
    console.log('Data Successfully Created');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
