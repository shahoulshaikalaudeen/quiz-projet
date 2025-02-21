const express = require("express");
const { register, login, logout, getUserFavorites, toggleFavorite } = require("../controllers/user.controller");
const express = require('express');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post('/:id/favorites', toggleFavorite);
router.get('/:id/favorites', getUserFavorites);

module.exports = router;