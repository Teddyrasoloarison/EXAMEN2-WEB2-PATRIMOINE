const { readFile, writeFile } = require('../data/index');

// Ajouter une possession
async function ajouterPossession(req, res) {
    try {
        const { libelle, valeur, dateDebut, tauxAmortissement } = req.body;

        // Lire les données existantes
        const { data: existingData, status: readStatus } = await readFile('./data/possessions.json');
        if (readStatus === 'ERROR') throw new Error('Erreur de lecture du fichier');

        // Ajouter la nouvelle possession
        const newPossession = {
            libelle,
            valeur,
            dateDebut,
            tauxAmortissement,
        };
        existingData.push(newPossession);

        // Écrire les données mises à jour dans le fichier
        const { status: writeStatus } = await writeFile('./data/possessions.json', existingData);
        if (writeStatus === 'ERROR') throw new Error('Erreur d\'écriture du fichier');

        // Répondre avec la nouvelle possession créée
        res.status(201).json(newPossession);
    } catch (error) {
        console.error('Erreur dans ajouterPossession:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

// Obtenir la liste des possessions
async function getPossessions(req, res) {
    try {
        const { status, data } = await readFile('./data/possessions.json');
        if (status === 'ERROR') {
            return res.status(500).json({ error: 'Erreur de lecture du fichier' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des possessions:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

// Mettre à jour une possession par libelle
async function updatePossession(req, res) {
    const { libelle } = req.params;
    const { valeur } = req.body;

    try {
        // Lire les données existantes
        const { data: existingData, status: readStatus } = await readFile('./data/possessions.json');
        if (readStatus === 'ERROR') throw new Error('Erreur de lecture du fichier');

        // Trouver et mettre à jour la possession correspondante
        let updated = false;
        const updatedData = existingData.map(possession => {
            if (possession.libelle === libelle) {
                updated = true;
                return { ...possession, valeur }; // Mise à jour du champ dateFin
            }
            return possession;
        });

        if (!updated) {
            return res.status(404).json({ error: 'Possession non trouvée' });
        }

        // Écrire les données mises à jour dans le fichier
        const { status: writeStatus } = await writeFile('./data/possessions.json', updatedData);
        if (writeStatus === 'ERROR') throw new Error('Erreur d\'écriture du fichier');

        res.status(200).json({ message: 'Possession mise à jour avec succès' });
    } catch (error) {
        console.error('Erreur dans updatePossession:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

// Clore une possession par libelle
async function closePossession(req, res) {
    const { libelle } = req.params;
    console.log('Received libelle:', libelle);

    try {
        const { status, data } = await readFile('./data/possessions.json');
        if (status === 'ERROR') {
            return res.status(500).json({ error: 'Erreur de lecture du fichier' });
        }

        console.log('Data from file:', data);
        const possession = data.find(p => p.libelle === libelle);
        if (!possession) {
            return res.status(404).json({ error: 'Possession non trouvée' });
        }

        possession.dateFin = new Date().toISOString();

        await writeFile('./data/possessions.json', data);
        res.status(200).json({ success: true, data: possession });
    } catch (error) {
        console.error('Erreur lors de la clôture de la possession:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

async function deletePossession(req, res) {
    const { libelle } = req.params;

    try {
        // Lire les données existantes
        const { status, data } = await readFile('./data/possessions.json');
        if (status === 'ERROR') {
            return res.status(500).json({ error: 'Erreur de lecture du fichier' });
        }

        // Trouver l'index de la possession à supprimer
        const index = data.findIndex(p => p.libelle === libelle);
        if (index === -1) {
            return res.status(404).json({ error: 'Possession non trouvée' });
        }

        // Supprimer la possession
        data.splice(index, 1);

        // Écrire les données mises à jour
        await writeFile('./data/possessions.json', data);
        res.status(200).json({ success: true, message: 'Possession supprimée' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la possession:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

module.exports = {
    ajouterPossession,
    getPossessions,
    updatePossession,
    closePossession,
    deletePossession
};
