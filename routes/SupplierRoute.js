const express = require('express');
const { getAllShops, getSupplierById } = require('../controllers/SupplierController');


const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));

//get all the products
router.get('/sellers', getAllShops);


//get supplier data by id
router.get('/usersdata/:userId', getSupplierById);


module.exports = router;

