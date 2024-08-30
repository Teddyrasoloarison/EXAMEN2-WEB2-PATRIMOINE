import React, { useState } from 'react';

const PatrimoinePage = () => {
  const [date, setDate] = useState('');
  const [patrimoineValue, setPatrimoineValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    if (!date) {
      setError('Veuillez sélectionner une date.');
      return;
    }

    setLoading(true);
    setError(null);
    setPatrimoineValue(null);  // Clear previous data before new fetch

    try {
      const response = await fetch(`http://localhost:3001/api/patrimoine/${date}`);
      
      if (!response.ok) {
        throw new Error('La réponse du réseau n\'était pas correcte');
      }

      const data = await response.json();
      setPatrimoineValue(data.patrimoine);  // Assumes the API returns { patrimoine: value }
    } catch (error) {
      setError(`Erreur lors de la récupération des données: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Patrimoine Page</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleFetchData}>Fetch Patrimoine Data</button>
      
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
      {patrimoineValue !== null && (
        <p>Valeur du patrimoine au {date}: {patrimoineValue}</p>
      )}
    </div>
  );
};

export default PatrimoinePage;
