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

import TokenServices from './utils/TokenServices';

const App: React.FC = () => {
  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={TokenServices.loggedIn() ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={TokenServices.loggedIn()? <Home/> : <Login/>} />
        <Route path="/setting" element={TokenServices.loggedIn()? <UserSetting /> : <Login/>} />
        <Route path="/settings" element={TokenServices.loggedIn()?<GameSettings /> : <Login/>} />
        <Route path="/quiz" element={TokenServices.loggedIn()?<TriviaGame />: <Login/>} />
        <Route path="/savedquiz" element={TokenServices.loggedIn()?<SavedTriviaGame />: <Login/>} />
        <Route path="/highscores" element={TokenServices.loggedIn()?<HighScores />: <Login/>} />
      </Routes>
    </Router>
  );
};

export default App;
