import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';
import imageHero from '../assets/home-bg.png';
import logo from '../assets/logo.png';

function Home() {
  const user = useSelector((state) => state.user);

  return (
    <div className="homepage-container">
      <div className="content-container">
        <div className="d-flex flex justify-content-center align-items-center gap-5">
          <div className="left-wrapper">
            <img
              src={imageHero}
              alt="Image Hero"
              className="d-block d-sm-none"
              width={300}
            />
            <div className="text-column">
              <h1 className="pb-3">Begin your language learning journey!</h1>
              <p>
                Unitive provides a unique space for users to engage in language
                exchange, cultural exchange, and collaborative learning
                experiences.
              </p>
              <Link to={user ? '/chat' : '/signup'}>
                <button type="button" class="btn btn-primary">
                  {user ? 'Start Learning' : 'Get Started'}
                  <i className="fas fa-comments home-message-icon"></i>
                </button>
              </Link>
            </div>
          </div>
          <div className="d-none d-sm-block right-wrapper">
            <img src={imageHero} alt="Image Hero" className="image-hero" />
          </div>
        </div>
      </div>

      <div className="border-top w-100 footer-container">
        <div className="footer-wrapper">
          <div className="d-flex justify-content-center align-items-center pb-2 copyright-footer">
            © Unitive 2024, All rights reserved.
          </div>
          <div className="text-center text-footer">
            Embark on a linguistic journey with Unitive! Unitive is committed to
            providing you with a better, faster, and safer experience as you
            traverse the exciting landscape of language acquisition.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
