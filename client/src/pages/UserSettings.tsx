import React, { useEffect, useState } from 'react';
import TokenServices from '../utils/TokenServices';


const Setting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  const toggleDarkMode = async () => {
    try {
      const newMode = !darkMode;
      const user = TokenServices.getUsername()
      await fetch(`/user/${user}/darkmode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${TokenServices.getBearer()}`,
        },
        body: JSON.stringify({ darkmode: newMode }),
      });

      setDarkMode(newMode);
    } catch (error) {
      console.error('Error toggling dark mode:', error);
    }
  };

  const handleClearScore = async () => {
    try {
      const user = TokenServices.getUsername()
      await fetch(`/user/${user}/scores`, {
        method: 'DELETE',
        headers: { Authorization: `${TokenServices.getBearer()}`},
      });

      alert('Scores cleared successfully!');
    } catch (error) {
      console.error('Error clearing scores:', error);
    }
  };

  const handleChangePassword = async () => {
    const newPassword = prompt('Enter your new password:');
    if (newPassword) {
      try {
        const user = TokenServices.getUsername()
        await fetch(`/user/${user}/changepassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${TokenServices.getBearer()}`,
          },
          body: JSON.stringify({ password: newPassword }),
        });

        alert('Password changed successfully!');
      } catch (error) {
        console.error('Error changing password:', error);
      }
    }
  };

  const handleDifficultyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDifficulty = e.target.value;
    try {
      const user = TokenServices.getUsername()
      await fetch(`/user/${user}/difficulty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${TokenServices.getBearer()}`,
        },
        body: JSON.stringify({ difficulty: newDifficulty }),
      });

      setDifficulty(newDifficulty);
      alert(`Preferred difficulty set to ${newDifficulty}`);
    } catch (error) {
      console.error('Error setting difficulty:', error);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const user = TokenServices.getUsername();
        const darkModeRes = await fetch(`/user/${user}/darkmode`, {
          headers: { Authorization: `${TokenServices.getBearer()}` },
        });
        const difficultyRes = await fetch(`/user/${user}/difficulty`, {
          headers: { Authorization: `${TokenServices.getBearer()}` },
        });

        if (darkModeRes.ok) {
          setDarkMode(await darkModeRes.text() === 'true');
        }
        if (difficultyRes.ok) {
          setDifficulty(await difficultyRes.text());
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <>
      
      <section className="container-fluid text-center p-3">
        <div className="row justify-content-center">
        <img
              src="/images/Trivia.jpg"
              alt="Trivia Game"
              className="img-fluid rounded-circle mb-3 shadow"
            />
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
                value={difficulty}
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
    </>
  );
};

export default Setting;