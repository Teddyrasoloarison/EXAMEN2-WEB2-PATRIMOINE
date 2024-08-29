import React, { useState } from 'react';

const PatrimoinePage = () => {
  const [date, setDate] = useState('');
  const [patrimoineValue, setPatrimoineValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/api/patrimoine/${date}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPatrimoineValue(data);
    } catch (error) {
      setError(error.message);
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
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {patrimoineValue !== null && <p>Valeur du patrimoine: {patrimoineValue}</p>}
    </div>
  );
};

export default PatrimoinePage;
