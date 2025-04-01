/**
 * @file transactions.js
 * @description Routes pour gérer les transactions financières dans l'application.
 * Permet d'ajouter, de récupérer et de supprimer des transactions dans la base de données.
 */

const express = require("express");
const Transaction = require("../models/transaction");
const router = express.Router();

/**
 * Route pour obtenir toutes les transactions
 * @route GET /api/transactions
 * @returns {Array<Transaction>} 200 - Liste des transactions
 */
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Route pour obtenir la balance totale des transactions
 * @route GET /api/transactions/balance
 * @returns {number} 200 - La balance totale des transactions (revenus - dépenses)
 */
router.get("/balance", async (req, res) => {
  try {
    const income = await Transaction.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const balance = (income[0]?.total || 0) - (expense[0]?.total || 0);
    res.status(200).json({ balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Route pour obtenir une transaction spécifique par son ID
 * @route GET /api/transactions/:id
 * @param {string} id.params - ID de la transaction à récupérer
 * @returns {Transaction} 200 - La transaction demandée
 * @returns {string} 404 - Si la transaction n'est pas trouvée
 */
router.get("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Route pour ajouter une nouvelle transaction
 * @route POST /api/transactions
 * @param {string} description.body - Description de la transaction
 * @param {number} amount.body - Montant de la transaction
 * @param {string} type.body - Type de la transaction (income/expense)
 * @returns {Transaction} 201 - Transaction ajoutée avec succès
 */
router.post("/", async (req, res) => {
  const { description, amount, type } = req.body;

  const transaction = new Transaction({
    description,
    amount,
    type,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Route pour supprimer une transaction par son ID
 * @route DELETE /api/transactions/:id
 * @param {string} id.params - ID de la transaction à supprimer
 * @returns {string} 200 - Message de confirmation de suppression
 */
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction supprimée avec succès" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
