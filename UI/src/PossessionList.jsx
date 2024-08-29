import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PossessionList = () => {
  const [possessions, setPossessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the list of possessions from the API
  useEffect(() => {
    const fetchPossessions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/possession');
        if (!response.ok) {
          throw new Error('Failed to fetch possessions');
        }
        const data = await response.json();
        setPossessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPossessions();
  }, []);

  const handleClose = async (libelle) => {
    try {
      const response = await fetch(`http://localhost:3001/api/possession/${libelle}/close`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to close possession');
      }
      // Optionally refetch or update the list
      setPossessions(possessions.map(p => p.libelle === libelle ? { ...p, dateFin: new Date().toISOString() } : p));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (libelle) => {
    try {
      const response = await fetch(`http://localhost:3001/api/possession/${libelle}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete possession');
      }
      // Remove the deleted possession from the state
      setPossessions(possessions.filter(p => p.libelle !== libelle));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Liste des Possessions</h1>
      <Button as={Link} to="/possession/create" variant="primary">Créer Possession</Button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Libelle</th>
              <th>Valeur</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Taux d'amortissement</th>
              <th>Valeur Actuelle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {possessions.map(possession => (
              <tr key={possession.libelle}>
                <td>{possession.libelle}</td>
                <td>{possession.valeur}</td>
                <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A'}</td>
                <td>{possession.tauxAmortissement}</td>
                <td>{/* Calcul de la valeur actuelle, si nécessaire */}</td>
                <td>
                  <Button as={Link} to={`/possession/${possession.libelle}/update`} variant="warning">Éditer</Button>{' '}
                  <Button onClick={() => handleClose(possession.libelle)} variant="danger">Clôturer</Button>{' '}
                  <Button onClick={() => handleDelete(possession.libelle)} variant="danger">Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PossessionList;
