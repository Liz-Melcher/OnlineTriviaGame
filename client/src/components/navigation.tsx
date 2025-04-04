import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user'); // Optional: Clear user data if stored

      // Ensure navigation to the login page
      navigate('/', { replace: true }); // Use replace to prevent back navigation to a logged-in state

      // Reload the page to ensure the state is reset
      window.location.reload();
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
        <button
          className="btn btn-outline-light"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navigation;