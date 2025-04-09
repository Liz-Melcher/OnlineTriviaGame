import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenServices from '../utils/TokenServices';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (isLogin) {
          const response = await fetch('login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
            throw new Error('Invalid username or password');
          }

          const data = await response.json();
          TokenServices.store(data.token)
          //localStorage.setItem('id_token', data.token);
          //localStorage.setItem('isLoggedIn', 'true');
          navigate('/home');
        } else {
          const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
            throw new Error('Signup failed');
          }

          alert('Signup successful!');
          setIsLogin(true);
        }
      } catch (error) {
        const err = error as Error;
        alert(err.message);
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