import React, { useState } from 'react';

const PatrimoineRangePage = () => {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [jour, setJour] = useState(''); // Assure-toi de mettre une valeur correcte selon les besoins
  const [type, setType] = useState('month'); // 'month' ou autre valeur selon ton besoin
  const [patrimoineData, setPatrimoineData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/patrimoine/range', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateDebut,
          dateFin,
          jour,
          type
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPatrimoineData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Patrimoine Range Page</h1>
      <input
        type="date"
        value={dateDebut}
        onChange={(e) => setDateDebut(e.target.value)}
        placeholder="Date Début"
      />
      <input
        type="date"
        value={dateFin}
        onChange={(e) => setDateFin(e.target.value)}
        placeholder="Date Fin"
      />
      <input
        type="number"
        value={jour}
        onChange={(e) => setJour(e.target.value)}
        placeholder="Jour"
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="month">Month</option>
        <option value="day">Day</option>
        {/* Ajoutez d'autres options si nécessaire */}
      </select>
      <button onClick={handleFetchData}>Fetch Patrimoine Range Data</button>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {patrimoineData.map((item, index) => (
          <li key={index}>Date: {item.date}, Valeur: {item.patrimoine}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatrimoineRangePage;
