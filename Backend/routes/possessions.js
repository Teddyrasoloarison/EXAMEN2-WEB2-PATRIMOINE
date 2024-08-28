const express = require('express');
const router = express.Router();
const { ajouterPossession, getPossessions, updatePossession, closePossession, deletePossession } = require('../controllers/possessionsController');

// Route pour ajouter une possession
router.post('/', ajouterPossession);

// Route pour obtenir la liste des possessions
router.get('/', getPossessions);

// Route pour mettre à jour une possession par libelle
router.put('/:libelle', updatePossession);

// Route pour clore une possession par libelle
router.patch('/:libelle/close', closePossession);

// Route pour supprimer une possession
router.delete('/:libelle', deletePossession);

module.exports = router;
