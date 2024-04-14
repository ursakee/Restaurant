const express = require("express");
const router = express.Router();
const qrController = require("../controllers/qr.controller");

router.get("/generate-qr", qrController.generateQR);
router.get("/validate-qr", qrController.validateQR);

module.exports = router;
