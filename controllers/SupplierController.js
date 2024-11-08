const express = require('express');
const Supplier = require('../models/Supplier');


const getAllShops = async (req, res) => {
  try {
    const seller = await Supplier.find({});
    res.status(200).json(seller);

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'shop not found' })
  }
}

const getSupplierById = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Query the database to find the user by ID
    const user = await Supplier.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllShops,
  getSupplierById
}