import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { username?: string; password?: string; confirmPassword?: string } = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    if (!isLogin && password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (savedUser.username === username && savedUser.password === password) {
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/home');
        } else {
          alert('Invalid username or password');
        }
      } else {
        localStorage.setItem('user', JSON.stringify({ username, password }));
        alert('Signup successful!');
        setIsLogin(true);
      }
    }
  };

  return (
    <section className="container text-center p-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <img src="/image/Trivia1.jpg" alt="Trivia Game" className="img-fluid rounded-circle mb-3 shadow" />
          <div className="d-flex justify-content-center mb-3">
            <button className={`btn ${isLogin ? 'btn-primary' : 'btn-outline-primary'} me-2`} onClick={() => setIsLogin(true)}>Login</button>
            <button className={`btn ${!isLogin ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setIsLogin(false)}>Sign Up</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
              {errors.username && <p className="text-danger">{errors.username}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                <input type="password" id="confirmPassword" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100">{isLogin ? 'Login' : 'Sign Up'}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;