const express = require('express');
const { getAllShops } = require('../controllers/ShopController');


const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));

//get all the products
router.get('/sellers', getAllShops);


module.exports = router;