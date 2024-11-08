const express = require('express');
const Ad = require('../models/AdModel');
const { getAllAds } = require('../controllers/AdController');

const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));


router.get('/allads',getAllAds);

module.exports = router;
