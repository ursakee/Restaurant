const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/categorie.controller");

router.get("/categories", categorieController.getAllCategories);

module.exports = router;
