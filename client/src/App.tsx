import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserSetting from './pages/UserSettings';
import GameSettings from './pages/GameSettings';
import TriviaGame from './pages/TriviaGame';
import HighScores from './pages/HighScores';
import Navigation from './components/Navigation'
import SavedTriviaGame from './pages/SavedTriviaGame';

import { useAuth } from './AuthContext';

const App: React.FC = () => {
  const { loggedIn } = useAuth();

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={ loggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={ loggedIn ? <Home/> : <Navigate to="/" />} />
        <Route path="/setting" element={ loggedIn ? <UserSetting /> : <Navigate to="/" /> } />
        <Route path="/settings" element={ loggedIn ?<GameSettings /> : <Navigate to="/" />} />
        <Route path="/quiz" element={ loggedIn ?<TriviaGame />: <Navigate to="/" />} />
        <Route path="/savedquiz" element={ loggedIn ?<SavedTriviaGame />: <Navigate to="/" />} />
        <Route path="/highscores" element={ loggedIn ?<HighScores />: <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
