/**
 * @file server.js
 * @description Serveur Express pour l'application de gestion de budget.
 * Ce fichier crée le serveur Express, configure les routes et se connecte à la base de données MongoDB.
 */

const express = require("express");
const mongoose = require("mongoose"); //
const bodyParser = require("body-parser");
require("dotenv").config();

/**
 * Initialisation de l'application Express
 * @constant {express.Application} app - L'application Express configurée
 */
const app = express();
const port = process.env.PORT || 5000;

/**
 * Middleware pour analyser les corps de requêtes en JSON
 * @function
 */
app.use(bodyParser.json());

/**
 * Connexion à MongoDB avec Mongoose
 * @returns {void}
 */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

/**
 * Importation des routes pour gérer les transactions
 * @constant {express.Router} transactionsRouter - Le routeur pour les opérations de transactions
 */
const transactionsRouter = require("./routes/transactions");

/**
 * Enregistrement du routeur pour gérer les transactions sous le chemin '/api/transactions'
 * @function
 */
app.use("/api/transactions", transactionsRouter);

/**
 * Démarrage du serveur Express
 * @function
 * @param {number} port - Le port sur lequel le serveur écoute
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
