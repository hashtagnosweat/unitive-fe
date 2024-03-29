import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import MessageForm from '../components/MessageForm';

function Chat() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col style={{ marginTop: '10px' }} md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
