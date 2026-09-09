// import de mongoose
const mongoose = require("mongoose");
// import d'express
const express = require("express");
// Création du serveur
const server = express();

const { PORT, DB_CONNECTION, FRONTEND_URL } = process.env;

// Pour autoriser 'cross-origin Request'
// Au sinon blocage front
const cors = require("cors");

server.use(
  cors({
    origin: [
      "https://audrey-sonkes.be",
      "https://www.audrey-sonkes.be",
      "https://api.audrey-sonkes.be",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

server.use(express.json());

// Connection DB (une seule fois au démarrage du serveur)
mongoose
  .connect(DB_CONNECTION, { dbName: "zero_dechet" })
  .then(() => console.log(`Successfully connected to the DB!`))
  .catch((err) => console.log(`Connection Failed \n [Reason]\n ${err}`));

// On indique où se trouve le router (index.js)
const router = require("./routes");

server.use("/api", router);

if (process.env.NODE_ENV !== "production") {
  server.listen(PORT, () => {
    console.log(`Server started on the PORT ${PORT}`);
  });
}
