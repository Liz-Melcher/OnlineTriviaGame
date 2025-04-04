import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="container-fluid text-center p-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <img
            src="/image/Trivia.jpg"
            alt="Trivia Game"
            className="img-fluid rounded-circle mb-3 shadow"
          />
          <button
            type="button"
            className="btn btn-primary w-100 mb-2 shadow-sm"
            onClick={() => navigate('/settings')} // Corrected path
          >
            Play a new Game
          </button>
          <button
            type="button"
            className="btn btn-primary w-100 mb-2 shadow-sm"
            onClick={() => navigate('/quiz')}
          >
            Continue existing Game
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
  );
};

export default Home;