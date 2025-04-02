import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameSettings from './pages/GameSettings';
// import TriviaGame from './pages/TriviaGame'; // Uncomment once created 

//TO DO:  fix the H1 text  
// TO DO: Update the routes; current routes are for testing
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="text-center mt-5"><h1>Welcome to Trivia Game</h1></div>} />
        <Route path="/test-gamesettings" element={<GameSettings />} />
        {/* <Route path="/quiz" element={<Quiz />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
