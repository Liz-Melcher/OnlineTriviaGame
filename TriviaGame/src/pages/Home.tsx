// 4/2/2025 - this is starter code for testing on Liz's game logic branch; this is not the final code for home.tsx 
// TO DO: this file will be updated with code from Gamal. 

import React from 'react';
import AppNavBar from '../components/NavBar'; // 4/2/2025 - AppNavBar is from Liz's code for testing; Gamal's code may have a different name 
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
