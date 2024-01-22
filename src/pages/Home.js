import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import './Home.css';

function Home() {
  const user = useSelector((state) => state.user);

  return (
    <div className="homepage">
      <Row>
        <Col
          md={6}
          className="d-flex flex-direction-column align-items-center justify-content-center"
        >
          <div className="text-column">
            <h1>Begin your language learning journey!</h1>
            <p>
              Unitive unites you with native speakers and learners all over the
              world.
            </p>
            <LinkContainer to={user ? '/chat' : '/signup'}>
              <Button>
                {user ? 'Start Learning' : 'Get Started'}
                <i className="fas fa-comments home-message-icon"></i>
              </Button>
            </LinkContainer>
          </div>
        </Col>
        <Col md={6} className="home__bg"></Col>
      </Row>
      {/* <div className='footer'>Copyright® 2022 Unitive</div> */}
    </div>
  );
}

export default Home;
