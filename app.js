// import d'express
const express = require("express");

// Création du serveur
const server = express();

const { PORT } = process.env;

server.use(express.json());

// On inqdique où se trouve le router(index.js)
const router = require("./routes");

server.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server started on the PORT ${PORT}`);
});
