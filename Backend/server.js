const express = require('express');
const app = express();
const PORT = 3001;
const fs = require('fs/promises');

const dataFilePath = './data/possessions.json';

app.use(express.json());

// Fonction pour lire les données du fichier JSON
async function readData() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
}

// Fonction pour écrire les données dans le fichier JSON
async function writeData(data) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data:', err);
    }
}

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
