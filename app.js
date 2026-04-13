// import de mongoose
const mongoose = require("mongoose");
// import d'express
const express = require("express");
// Création du serveur
const server = express();

const { PORT, DB_CONNECTION } = process.env;

// Pour autoriser 'cross-origin Request'
// Au sinon blocage front
const cors = require("cors");

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

server.use(express.json());

// Connection DB (doit être faite avant le router)
// Middleware créé pour établir une connection à chaque requête
server.use(async (req, res, next) => {
  try {
    await mongoose.connect(DB_CONNECTION, { dbName: "zero_dechet" });
    console.log(`Successfully connected to the DB!`);
    next();
  } catch (err) {
    console.log(`Connection Failed \n [Reason]\n ${err}`);
    res.status(500).json({
      statusCode: 500,
      message: `Impossible de se connecter à la base de données`,
    });
  }
});

// On inqdique où se trouve le router(index.js)
const router = require("./routes");

server.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server started on the PORT ${PORT}`);
});
