// 4/2/2025 - this is starter code for testing on Liz's game logic branch; this is not the final code for home.tsx 

import React from 'react';
import AppNavBar from '../components/NavBar';
import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <>
      <AppNavBar />
      <Container className="py-5 text-center">
        <h1 className="display-4">Welcome to Trivia Time!</h1>
        <p className="lead">Click on Game Settings to get started with a custom quiz.</p>
      </Container>
    </>
  );
};

export default Home;
