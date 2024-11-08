const express = require('express');
const Ad = require('../models/AdModel')
const getAllAds = async (req, res) => {
    try {
      const product = await Ad.find().sort({
        createdAt: -1,
      });
      res.status(200).json(product);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message })
  
    }
  }


  module.exports = {
    getAllAds
  }