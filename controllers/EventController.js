const express = require('express');
const Events = require('../models/EventModel');


//query all the events
const getAllEvents = async(req,res)=>{
    try {
        const event = await Events.find({});
        res.status(200).json(event);


        
    } catch (error) {
        console.log("no events fount");
        res.status(500).json({message: error})
    }
}

module.exports = {
  getAllEvents
}
    
