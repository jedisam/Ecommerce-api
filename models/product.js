const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item Name is required'],
  },
  productImg: {
    type: String,
    required: [true, "Product's Image is required!"],
  },
  quantity: Number,
  itemType: {
    type: String,
    required: [true, 'A product must have a type'],
  },
  price: {
    type: Number,
    required: [true, 'A Product must have a price'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Detailed description of the Item is required!'],
  },
  vendor: {
    type: String,
    required: [true, "Vendor's Name is required!"],
  },
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
