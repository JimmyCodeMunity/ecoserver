const express = require('express');
const Category = require('../models/Category');
const { getAllCategories } = require('../controllers/CategoryController');



const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));

//get all the products
router.get('/allcategories', getAllCategories);


// //get product by category
// router.get('/productlistcategory/:category',getProductByCategory);

// //get product by shop id
// router.get('/productlist/:shopId',getProductByShopId);

// //search products
// router.get('/search/:query', searchProducts);


module.exports = router;
