import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/patrimoine">Mon Patrimoine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/patrimoine">Patrimoine</Nav.Link>
            <Nav.Link as={Link} to="/possession">Liste des Possessions</Nav.Link>
            <Nav.Link as={Link} to="/possession/create">Créer une Possession</Nav.Link>
            <Nav.Link as={Link} to="/patrimoine/range">Plage de Patrimoine</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
