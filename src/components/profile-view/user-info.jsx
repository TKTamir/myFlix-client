import React from 'react';
import { Container, Col, Row, P } from 'react-bootstrap';

export default function Userinfo({ Email, Username, Birthdate }) {
  return (
    <Container>
      <Row>
        <Col>
          <P>User: {Username}</P>
          <P>Email: {Email}</P>
          <P>Birthdate: {Birthdate}</P>
        </Col>
      </Row>
    </Container>
  );
}
