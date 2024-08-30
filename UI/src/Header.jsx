import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css'; // Importez le fichier CSS personnalisé

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">  {/* Changer le bg et variant */}
      <Container>
        <Navbar.Brand as={Link} to="/patrimoine">Patrimoine Economique</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/patrimoine" className="nav-link-custom">Patrimoine</Nav.Link>
            <Nav.Link as={Link} to="/possession" className="nav-link-custom">Liste des Possessions</Nav.Link>
            <Nav.Link as={Link} to="/possession/create" className="nav-link-custom">Créer une Possession</Nav.Link>
            <Nav.Link as={Link} to="/patrimoine/range" className="nav-link-custom">Plage de Patrimoine</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

