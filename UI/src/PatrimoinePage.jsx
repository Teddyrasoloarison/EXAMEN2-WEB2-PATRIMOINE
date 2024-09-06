import React, { useState } from 'react';
import './PatrimoinePage.css'
const PatrimoinePage = () => {
  const [date, setDate] = useState('');
  const [patrimoine, setPatrimoine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const urlBackend = 'https://examen2-web2-patrimoine.onrender.com';

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${urlBackend}/api/patrimoine?date=${date}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPatrimoine(data.valeur);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='patrimoineContainer'>
      <h1>Calcul Patrimoine</h1>
      <div className="form-group">
        <label htmlFor="date">Sélectioner une date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button onClick={handleCalculate} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculer'}
      </button>
      
      {patrimoine !== null && <p>Valeur du patrimoine au {date}: {patrimoine.toFixed(2)}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default PatrimoinePage;
