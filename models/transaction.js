/**
 * @file transaction.js
 * @description Modèle Mongoose pour les transactions de gestion de budget.
 * Définit le schéma pour une transaction et les interactions avec la base de données MongoDB.
 */

const mongoose = require("mongoose");

/**
 * @typedef {Object} Transaction
 * @property {string} description - Description de la transaction (revenu ou dépense)
 * @property {number} amount - Montant de la transaction
 * @property {string} type - Type de la transaction (par exemple, 'revenu' ou 'dépense')
 */

/**
 * Schéma Mongoose pour la transaction.
 * @type {mongoose.Schema}
 */
const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Modèle Mongoose pour la transaction.
 * @type {mongoose.Model<Transaction>}
 */
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
