import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';
import imageHero from '../assets/home-bg.png';
import logo from '../assets/logo.png';
import mobileShowcase from '../assets/mobile-showcase.png';

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
                <button
                  type="button"
                  className="cta-btn shadow shadow-2 btn btn-primary"
                >
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

      <div className="showcase-item-container">
        <div className="showcase-item">
          <div className="row">
            <div className="showcase-left col-lg-6 text-center">
              <img src={mobileShowcase} alt="mobile-showcase" height={500} />
            </div>
            <div className="d-flex flex-column justify-content-center col-lg-6">
              <h1 className="showcase-title">Learn by Chatting</h1>
              <p className="pt-3 showcase-text">
                The best way to learn a language is to actually use it every
                day! Unitive connects you with native speakers to chat with for
                free. But this isn't your standard social app. The interface is
                packed with innovative tools to make it fun and effortless to
                learn a new language. You can chat with individual members, or
                join language chats for a collaborative learning experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top w-100 footer-container">
        <div className="footer-wrapper">
          <div className="icon-contact">
            <img src={logo} style={{ height: 40 }}></img>
            <div className="copyright-footer">
              © Unitive 2024, All rights reserved.
            </div>
          </div>

          <div className="d-block d-sm-none text-center mobile-copyright-footer">
            © Unitive 2024, All rights reserved.
          </div>

          <div className="d-flex justify-content-start text-footer">
            Discover the world through language with Unitive – Immerse yourself
            in a community of native speakers from around the globe.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
