require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const initSockets = require("./sockets");

const port = process.env.PORT;
const app = express();
// link
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
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

const server = http.createServer(app);
initSockets(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
