const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Endpoint pour obtenir la liste des possessions
app.get('/possession', (req, res) => {
  // Retourne la liste des possessions
  res.status(200).json({ message: 'Liste des possessions' });
});

// Endpoint pour créer une nouvelle possession
app.post('/possession', (req, res) => {
  const { libelle, valeur, dateDebut, taux } = req.body;
  // Logic pour ajouter la possession ici
  res.status(201).json({ message: 'Possession créée' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
