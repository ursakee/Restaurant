const express = require("express");
const router = express.Router();
const mancareController = require("../controllers/mancare.controller");

router.get("/foods", mancareController.getAllFoods);
router.get("/foods/:id", mancareController.getFoodDetails);

module.exports = router;
