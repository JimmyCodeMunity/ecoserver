const express = require('express');
const Product = require('../models/ProductModel');
const { getAllProducts, getProductByCategory,getProductByShopId,searchProducts,getProductsBySupplier } = require('../controllers/ProductController');


const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));

//get all the products
router.get('/productlist', getAllProducts);


//get product by category
router.get('/productlistcategory/:category',getProductByCategory);

//get product by shop id
router.get('/productlist/:supplier',getProductsBySupplier);

//search products
router.get('/search/:query', searchProducts);


module.exports = router;
