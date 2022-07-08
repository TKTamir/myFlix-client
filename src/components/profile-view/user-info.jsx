import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

function Userinfo(email, username, birthdate) {
  return (
    <Container>
      <Row>
        <Col>
          <P>User: {username}</P>
          <P>Email: {email}</P>
          <P>Birthdate: {birthdate}</P>
        </Col>
      </Row>
    </Container>
  );
}

export default Userinfo;
