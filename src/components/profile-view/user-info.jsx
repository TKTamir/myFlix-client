import React from 'react';

import { Container, Col, Row } from 'react-bootstrap';

function UserInfo({ user }) {
  return (
    <Container>
      <Row>
        <h3>Your profile:</h3>
      </Row>
      <Row>
        <Col className="label">Username:</Col>
        <Col className="value">{user.Username}</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Password:</Col>
        <Col className="value">******</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Email:</Col>
        <Col className="value">{user.Email}</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Birthdate:</Col>
        <Col className="value">{user.Birthdate}</Col>
      </Row>
    </Container>
  );
}
export default UserInfo;
