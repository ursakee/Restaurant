const crypto = require("crypto");

require("dotenv").config();

exports.generateQR = (req, res) => {
  const tableId = req.query.tableId;
  const token = `tableId=${tableId}`;
  const signature = crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(token)
    .digest("hex");

  const urlWithToken = `${process.env.LINK}?${token}&signature=${signature}`;
  res.send({ qrUrl: urlWithToken });
};

exports.validateQR = (req, res) => {
  const tableId = req.query.tableId;
  const signature = req.query.signature;
  const token = `tableId=${tableId}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(token)
    .digest("hex");

  if (signature === expectedSignature) {
    res.send({ valid: true, tableId });
  } else {
    res.status(401).send({ valid: false, message: "Invalid signature" });
  }
};
