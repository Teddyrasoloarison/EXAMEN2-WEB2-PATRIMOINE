import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePossessionPage = () => {
  const { libelle } = useParams();
  const navigate = useNavigate();
  const [possessions, setPossessions] = useState([]);
  const [currentPossession, setCurrentPossession] = useState(null);
  const [valeur, setValeur] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the current possession details when the component mounts
  useEffect(() => {
    const fetchPossession = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/possession/${libelle}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurrentPossession(data);
        setValeur(data.valeur);
        setDateFin(data.dateFin || '');
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPossession();
  }, [libelle]);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`http://localhost:3001/api/possession/${libelle}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          libelle,
          valeur,
          dateFin
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSuccessMessage('Possession mise à jour avec succès!');
      // Redirect or update UI as needed
      navigate('/possession'); // Redirect to the list of possessions
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Possession</h1>
      {currentPossession ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
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
            <label htmlFor="dateFin">Date Fin</label>
            <input
              type="date"
              id="dateFin"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      
      {successMessage && <p>{successMessage}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default UpdatePossessionPage;
