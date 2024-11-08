const mongoose = require('mongoose');

// Create Brand model
const brandSchema = new mongoose.Schema({
    brandname: String,
    brandimage:String,
    categories: String,
    subcategories:[String],
  
  
  });
  
  const Brand = mongoose.model('Brand', brandSchema);

  module.exports = Brand;