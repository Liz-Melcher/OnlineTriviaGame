import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { loggedIn, logout, getUsername } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout(); // Destroys JWT login token

      // Ensure navigation to the login page
      navigate('/', { replace: true }); // Use replace to prevent back navigation to a logged-in state
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#007bff' }}>
      <div className="container-fluid">
        {/* Home button styled like Log Out */}
        <button
          className="btn btn-outline-light me-auto"
          onClick={() => navigate('/home')}
        >
          Home
        </button>
        {/* Log Out button */}
        {loggedIn && (
          <>
            <span className="me-3 text-white fw-bold fst-italic">{getUsername()}</span>
            <button
              className="btn btn-outline-light"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
