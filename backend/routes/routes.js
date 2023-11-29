const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/usermodel");

const router = express.Router();

router.get('/', async (req, res) => {
  res.send("App is working Fine")
})

router.post('/Usermanage/add', async (req, res) => {
console.log("in try")
  const { name, email, phone, city, age } = req.body;
  try {
    const userData = await User.create({
      name: name,
      email: email,
      phone: phone,
      city: city,
      age: age
    })
    res.status(200).json(userData)
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
})

router.get('/Usermanage', async (req, res) => {
  try {
    const showAll = await User.find()
    res.status(200).json(showAll)
  } catch (error) {
    res.status(401);
  }
})

router.delete('/Usermanage/delete/:id', async (req, res) => {
  console.log("i try ")
  const { id } = req.params;
  console.log(id)

  try {
    // Your logic to delete the user with the given ID
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/Usermanage/Update/:id', async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;

  try {
    // Your logic to update the user with the given ID
    const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;