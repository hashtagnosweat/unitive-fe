import React, { useState } from 'react';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import { useSignupUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import botImg from '../assets/bot.png';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();

  // image upload states
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      return alert('Max file size is 1 mb');
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'h5ajwmxy');
    try {
      setUploadingImg(true);
      let res = await fetch(
        'https://api.cloudinary.com/v1_1/dwr7dpnc9/image/upload',
        {
          method: 'post',
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert('Please upload your profile picture!');
    const url = await uploadImage(image);
    // signup the user
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
        navigate('/onboarding');
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
        <h1 className="mt-5 fw-light">Create an Account</h1>
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="signup-profile-pic__container my-4">
            <img
              src={imagePreview || botImg}
              className="signup-profile-pic"
              alt="Profile"
            />
            <label htmlFor="image-upload" className="image-upload-label">
              <i className="fas fa-plus-circle add-picture-icon"></i>
            </label>
            <input
              type="file"
              id="image-upload"
              hidden
              accept="image/png, image/jpeg"
              onChange={validateImg}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="formBasicName"
              className="d-flex align-items-start form-label"
            >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formBasicName"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="formBasicEmail"
              className="d-flex align-items-start form-label"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="formBasicEmail"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <small className="d-flex align-items-start text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="mb-3">
            <label
              htmlFor="formBasicPassword"
              className="d-flex align-items-start form-label"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="formBasicPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button type="submit" className="auth-btn btn btn-primary mb-3">
            {uploadingImg ? 'Signing you up...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>

    // OLD CODE

    // <div className="signup-container">
    //   <form
    //     style={{ width: '80%', maxWidth: 500 }}
    //     onSubmit={handleSignup}
    //     className="mt-3"
    //   >
    //     <h1 className="text-center mb-4">Create account</h1>

    //     <div className="signup-profile-pic__container mb-3">
    //       <img
    //         src={imagePreview || botImg}
    //         className="signup-profile-pic"
    //         alt="Profile"
    //       />
    //       <label htmlFor="image-upload" className="image-upload-label">
    //         <i className="fas fa-plus-circle add-picture-icon"></i>
    //       </label>
    //       <input
    //         type="file"
    //         id="image-upload"
    //         hidden
    //         accept="image/png, image/jpeg"
    //         onChange={validateImg}
    //       />
    //     </div>

    //     <div className="mb-3">
    //       <label htmlFor="formBasicName" className="form-label">
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="formBasicName"
    //         placeholder="Your name"
    //         onChange={(e) => setName(e.target.value)}
    //         value={name}
    //       />
    //     </div>

    //     <div className="mb-3">
    //       <label htmlFor="formBasicEmail" className="form-label">
    //         Email address
    //       </label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="formBasicEmail"
    //         placeholder="Enter email"
    //         onChange={(e) => setEmail(e.target.value)}
    //         value={email}
    //       />
    //       <small className="text-muted">
    //         We'll never share your email with anyone else.
    //       </small>
    //     </div>

    //     <div className="mb-3">
    //       <label htmlFor="formBasicPassword" className="form-label">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="formBasicPassword"
    //         placeholder="Password"
    //         onChange={(e) => setPassword(e.target.value)}
    //         value={password}
    //       />
    //     </div>

    //     <button type="submit" className="btn btn-primary mb-3">
    //       {uploadingImg ? 'Signing you up...' : 'Signup'}
    //     </button>

    //     <div className="py-4 text-center">
    //       <p>
    //         Already have an account? <Link to="/login">Login</Link>
    //       </p>
    //     </div>
    //   </form>
    // </div>
  );
}

export default Signup;
