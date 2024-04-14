require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Routes
const categorieRoute = require("./routes/categorie.route");
app.use("/api", categorieRoute);

const mancareRoute = require("./routes/mancare.route");
app.use("/api", mancareRoute);

const qrRoutes = require("./routes/qr.route");
app.use("/api", qrRoutes);

const comandaRoutes = require("./routes/comanda.route");
app.use("/api", comandaRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
