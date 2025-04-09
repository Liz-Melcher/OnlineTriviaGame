import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TokenServices from '../utils/TokenServices';

const Home = () => {
  const navigate = useNavigate();
  const [hasSavedGame, setHasSavedGame] = useState(false);

  useEffect(() => {
    const checkSavedGame = async () => {
      try {
        const user = TokenServices.getUsername()
        const response = await fetch(`/user/${user}/game`, {
          headers: {Authorization: `${TokenServices.getBearer()}`},
        });

        if (response.ok) {
          const data = await response.json();
          setHasSavedGame(!!data.questions);
        }
      } catch (error) {
        console.error('Error checking saved game:', error);
      }
    };

    checkSavedGame();
  }, []);

  return (
    <>
      <section className="container-fluid text-center p-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <img
              src="/image/Trivia.jpg"
              alt="Trivia Game"
              className="img-fluid rounded-circle mb-3 shadow"
            />

            {/* <button
              type="button"
              className="btn btn-success w-100 mb-2 shadow-sm"
              onClick={() => navigate('/quiz')}
            >
              Start New Game
            </button> */}

            <button
              type="button"
              className="btn btn-primary w-100 mb-2 shadow-sm"
              onClick={() => navigate('/settings')}
            >
              Play a new Game
            </button>

            <button
              type="button"
              className="btn btn-primary w-100 mb-2 shadow-sm"
              onClick={() => navigate('/quiz')}
              disabled={!hasSavedGame}
            >
              Continue Existing Game
            </button>

            <button
              type="button"
              className="btn btn-primary w-100 mb-2 shadow-sm"
              onClick={() => navigate('/highscores')}
            >
              History of Scores
            </button>

            <button
              type="button"
              className="btn btn-primary w-100 shadow-sm"
              onClick={() => navigate('/setting')}
            >
              Settings
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
