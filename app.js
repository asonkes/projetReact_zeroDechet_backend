// import d'express
const express = require("express");

// Création du serveur
const server = express();

const { PORT } = process.env;

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Server started on the PORT ${PORT}`);
});
