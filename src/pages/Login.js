import React, { useContext, useState } from 'react';
import { Row, Col, Form, Container, Button, Spinner } from 'react-bootstrap';
import { useLoginUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { AppContext } from '../context/appContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  function handleLogin(e) {
    e.preventDefault();
    // login logic
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        // socket work here
        socket.emit('new-user');
        // navigate to admin page
        if (data.isAdmin) {
          navigate('/admin');
        } else {
          // navigate to the chat
          navigate('/chat');
        }
      }
    });
  }

  return (
    <div className="auth-container my-5">
      <div className="text-center shadow bg-white border border-1 auth-card">
        <div className="row g-0 auth">
          <div className="col-6">
            <Link
              className="border-bottom border-end border-1 auth-buttons-link auth-signup-link"
              to="/signup"
            >
              <span className="auth-signup">SIGN UP</span>
            </Link>
          </div>
          <div className="col-6">
            <Link
              className="border-bottom border-start border-1 auth-buttons-link auth-login-link"
              to="/login"
            >
              <span className="auth-login">LOGIN</span>
            </Link>
          </div>
        </div>
        <h1 className="my-5 fw-light">Login to Your Account</h1>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="mb-3" controlId="formBasicEmail">
            {error && <p className="alert alert-danger">{error.data}</p>}
            <label
              htmlFor="exampleInputEmail1"
              className="d-flex align-items-start form-label"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <div id="emailHelp" className="d-flex align-items-start form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="d-flex align-items-start form-label"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button type="submit" className="auth-btn btn btn-primary">
            {isLoading ? (
              <div className="spinner-grow" role="status"></div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
