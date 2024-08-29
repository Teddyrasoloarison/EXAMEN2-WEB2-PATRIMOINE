import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'; // Assurez-vous que le nom du fichier est correct (Header.jsx)
import Patrimoine from './PatrimoinePage'; // Assurez-vous que le nom du fichier est correct (PatrimoinePage.jsx)
import PossessionList from './PossessionList'; // Assurez-vous que le nom du fichier est correct (PossessionList.jsx)
import CreatePossession from './CreatePossessionPage'; // Assurez-vous que le nom du fichier est correct (CreatePossessionPage.jsx)
import UpdatePossession from './UpdatePossessionPage'; // Assurez-vous que le nom du fichier est correct (UpdatePossessionPage.jsx)
import PatrimoineRangePage from './PatrimoineRangePage';
function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/patrimoine" element={<Patrimoine />} />
          <Route path="/possession" element={<PossessionList />} />
          <Route path="/possession/create" element={<CreatePossession />} />
          <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
          <Route path="/patrimoine/range" element={<PatrimoineRangePage />} /> {/* Ajoutez cette ligne */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
