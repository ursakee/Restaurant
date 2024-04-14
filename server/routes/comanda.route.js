const express = require("express");
const router = express.Router();
const comandaController = require("../controllers/comanda.controller");

router.post("/order/send", comandaController.sendOrder);
router.post("/order/table_order", comandaController.getOrder);

module.exports = router;
