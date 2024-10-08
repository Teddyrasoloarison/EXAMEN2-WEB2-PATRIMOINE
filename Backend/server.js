import express from 'express';
const app = express();
const PORT = 3001;
import fs from 'fs/promises';
import cors from 'cors';
app.use(cors()); // Ajoutez cette ligne pour activer CORS
const dataFilePath = './data/possessions.json';

app.use(express.json());

import bodyParser from 'body-parser';
import possessionRoutes from './routes/possessions.js';

app.use(bodyParser.json());

// Utiliser les routes pour les possessions
app.use('/api/possession', possessionRoutes);

// Fonction pour lire les données du fichier JSON
export async function readData() {
    try {
        await fs.access(dataFilePath); // Vérifie si le fichier existe
    } catch (err) {
        // Si le fichier n'existe pas, le créer avec un tableau vide
        await writeData([]);
    }

    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
}

// Fonction pour écrire les données dans le fichier JSON
export async function writeData(data) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data:', err);
    }
}

let possessions = [];

async function initializeData() {
    possessions = await readData();
}

initializeData();

// Endpoint pour obtenir la liste des possessions
app.get('/possession', (req, res) => {
    // Retourne la liste des possessions
    res.status(200).json({ message: 'Liste des possessions' });
    res.json(possessions);
});

// Endpoint pour créer une nouvelle possession
app.post('/possession', async (req, res) => {
    const { libelle, valeur, dateDebut, taux } = req.body;
    const newPossession = req.body;
    possessions.push(newPossession);
    await writeData(possessions);
    res.status(201).json(newPossession);
    // Logic pour ajouter la possession ici
    res.status(201).json({ message: 'Possession créée' });
});

app.put('/possession/:libelle', async (req, res) => {
    const { libelle } = req.params;
    const updatedPossession = req.body;
    const index = possessions.findIndex(possession => possession.libelle === libelle);

    if (index !== -1) {
        possessions[index] = { ...possessions[index], ...updatedPossession };
        await writeData(possessions);
        res.json(possessions[index]);
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
});

app.put('/possession/:libelle/close', async (req, res) => {
    const { libelle } = req.params;
    const index = possessions.findIndex(possession => possession.libelle === libelle);

    if (index !== -1) {
        possessions[index].dateFin = new Date().toISOString();
        await writeData(possessions);
        res.json(possessions[index]);
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
});

app.patch('/possession/:libelle/close', (req, res) => {
    const { libelle } = req.params;
    res.send(`Patch received for ${libelle}`);
});

import calculatePatrimoine from './calculatePatrimoine.js';

app.get('/api/patrimoine', async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ error: 'La date est requise' });
    }

    try {
        const patrimoineValue = await calculatePatrimoine(date);
        res.json({ date, valeur: patrimoineValue });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors du calcul du patrimoine' });
    }
});

import Flux from '../models/possessions/Flux.js'

app.get('/api/patrimoine/range', async (req, res) => {
    const { startDate, endDate, jour } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);

    let valeursPatrimoine = [];

    for (let d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
        const totalValeur = possessions.reduce((total, possession) => {
            const flux = new Flux(
                possession.possesseur,
                possession.libelle,
                possession.valeur,
                new Date(possession.dateDebut),
                possession.dateFin ? new Date(possession.dateFin) : null,
                possession.tauxAmortissement,
                jour
            );
            return total + flux.getValeur(new Date(d));
        }, 0);
        valeursPatrimoine.push({
            date: new Date(d),
            valeur: totalValeur
        });
    }

    res.json(valeursPatrimoine);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
