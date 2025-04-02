// 4/2/2025 - this is a mock up for testing on Liz's branch; this is not the final code.
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AppNavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // placeholder for actual logout logic
    alert('You have been logged out!');
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Trivia Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/settings">Game Settings</Nav.Link>
            <Nav.Link as={Link} to="/quiz">Quiz</Nav.Link>
            {/* Add more Nav.Links as needed */}
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Log Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;
