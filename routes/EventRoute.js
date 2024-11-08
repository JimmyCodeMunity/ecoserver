const express = require('express');
const Event = require('../models/EventModel');
const { getAllEvents } = require('../controllers/EventController');

const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));


router.get('/allevents',getAllEvents);

module.exports = router;
