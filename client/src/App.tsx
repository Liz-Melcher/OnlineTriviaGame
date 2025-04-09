import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserSetting from './pages/UserSettings';
import GameSettings from './pages/GameSettings';
import TriviaGame from './pages/TriviaGame';
import HighScores from './pages/HighScores';
import Navigation from './components/navigation'
import SavedTriviaGame from './pages/SavedTriviaGame';

const App: React.FC = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setting" element={<UserSetting />} />
        <Route path="/settings" element={<GameSettings />} />
        <Route path="/quiz" element={<TriviaGame />} />
        <Route path="/savedquiz" element={<SavedTriviaGame />} />
        <Route path="/highscores" element={<HighScores />} />
      </Routes>
    </Router>
  );
};

export default App;
