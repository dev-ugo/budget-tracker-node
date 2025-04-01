# Budget Tracker API

Ce petit projet est une API de gestion de budget réalisée dans le cadre de ma certification Back-End Development et APIs de [freeCodeCamp](https://www.freecodecamp.org/). L'objectif de ce projet est de mettre en pratique mes compétences en Node.js, Express, MongoDB, et la gestion des routes et des requêtes HTTP.

## Fonctionnalités principales

- **Ajouter des transactions :** Enregistrer des transactions de type "income" (revenus) ou "expense" (dépenses).
- **Afficher toutes les transactions :** Voir l'historique complet des transactions enregistrées.
- **Afficher une transaction spécifique :** Rechercher une transaction par son identifiant.
- **Calculer la balance :** Calculer la balance totale en soustrayant les dépenses des revenus.

## Technologies utilisées

- **Node.js :** Environnement d'exécution JavaScript pour créer le serveur.
- **Express.js :** Framework web pour gérer les routes et les requêtes HTTP.
- **MongoDB :** Base de données NoSQL pour stocker les transactions.
- **Mongoose :** ODM (Object Document Mapper) pour interagir avec MongoDB à l'aide de modèles et de schémas.

## Routes disponibles

### `/api/transactions`

- **GET :** Retourne toutes les transactions enregistrées.
- **POST :** Ajoute une nouvelle transaction.
  - Paramètres : `type` (income ou expense), `amount`, `description`, `date` (optionnel, sinon la date actuelle est utilisée).

### `/api/transactions/:id`

- **GET :** Retourne une transaction spécifique en utilisant son `id`.

### `/api/balance`

- **GET :** Calcule la balance totale en soustrayant les dépenses des revenus.

## Exemple de requêtes

### 1. Ajouter une transaction (POST)

```bash
POST /api/transactions
{
  "type": "income",
  "amount": 500,
  "description": "Salaire de mars"
}
```

### 2. Afficher la balance (GET)

```bash
GET /api/balance
```

### 3. Obtenir une transaction par son ID (GET)

```bash
GET /api/transactions/604c1f4f8a6a0e8b31f3cba5
```
