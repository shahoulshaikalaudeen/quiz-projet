const User = require('../models/user.model');

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

// /controllers/userController.js
const { addOrRemoveFavorite, getFavorites } = require('../repositories/userRepository');

const toggleFavorite = async (req, res) => {
  const userId = req.params.id;
  const { quizId } = req.body;

  try {
    const updatedUser = await addOrRemoveFavorite(userId, quizId);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserFavorites = async (req, res) => {
  const userId = req.params.id;

  try {
    const favorites = await getFavorites(userId);
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { findUserByEmail, createUser,  toggleFavorite,
  getUserFavorites, };
