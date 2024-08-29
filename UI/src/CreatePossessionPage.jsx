import React, { useState } from 'react';

const CreatePossessionPage = () => {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [taux, setTaux] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('http://localhost:3001/api/possession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          libelle,
          valeur,
          dateDebut,
          taux
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSuccessMessage('Possession créée avec succès!');
      // Reset form fields or redirect as needed
      setLibelle('');
      setValeur('');
      setDateDebut('');
      setTaux('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Possession</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="form-group">
          <label htmlFor="libelle">Libelle</label>
          <input
            type="text"
            id="libelle"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valeur">Valeur</label>
          <input
            type="number"
            id="valeur"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateDebut">Date Début</label>
          <input
            type="date"
            id="dateDebut"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="taux">Taux</label>
          <input
            type="number"
            id="taux"
            value={taux}
            onChange={(e) => setTaux(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      
      {successMessage && <p>{successMessage}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreatePossessionPage;
