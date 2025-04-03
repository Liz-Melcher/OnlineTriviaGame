import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './pages/Home';
import GameSettings from './pages/GameSettings';
import TriviaGame from './pages/TriviaGame'; 
import HighScores from './pages/HighScores';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/settings" element={<GameSettings />} />
        <Route path="/quiz" element={<TriviaGame />} />
        <Route path="/highscores" element={<HighScores />} />
      </Routes>
    </Router>
  );
};

export default App;
