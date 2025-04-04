import React, { useEffect } from 'react';

const Setting = () => {
  const toggleDarkMode = () => {
    const currentMode = document.body.classList.contains('light') ? 'light' : 'dark';
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    document.body.classList.remove(currentMode);
    document.body.classList.add(newMode);
    localStorage.setItem('theme', newMode);
  };

  const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.remove('light', 'dark'); // Remove conflicting classes
    document.body.classList.add(savedTheme); // Apply saved theme
  };

  useEffect(() => {
    applySavedTheme(); // Apply theme on page load
  }, []);

  const handleClearScore = () => {
    localStorage.removeItem('highScores');
    alert('Scores cleared successfully!');
  };

  const handleChangePassword = () => {
    const newPassword = prompt('Enter your new password:');
    if (newPassword) {
      alert('Password changed successfully!');
    }
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const difficulty = e.target.value;
    localStorage.setItem('preferredDifficulty', difficulty);
    alert(`Preferred difficulty set to ${difficulty}`);
  };

  return (
    <section className="container-fluid text-center p-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
        <img
            src="/image/Trivia.jpg"
            alt="Trivia Game"
            className="img-fluid rounded-circle mb-3 shadow"
          />
          <h2 className="mb-4">User Settings</h2>
          <button
            type="button"
            className="btn btn-primary w-100 mb-2 shadow-sm"
            onClick={handleClearScore}
          >
            Clear Score
          </button>
          <button
            type="button"
            className="btn btn-primary w-100 mb-3 shadow-sm"
            onClick={toggleDarkMode}
          >
            Toggle Light/Dark Mode
          </button>
          <div className="mb-4">
            <h3>Set Preferred Difficulty</h3>
            <select
              className="form-select shadow-sm"
              aria-label="Select Difficulty"
              onChange={handleDifficultyChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary w-100 shadow-sm"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default Setting;