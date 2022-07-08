import React, { useState } from 'react';
import { Container, Col, Row, P } from 'react-bootstrap';

export default function Userinfo(props) {
  const [user, setUser] = useState(props.user);
  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('user');
  return (
    <Container>
      <Row>
        <Col>
          <P>User: {user.Username}</P>
          <P>Email: {user.Email}</P>
          <P>Birthdate: {user.Birthdate}</P>
        </Col>
      </Row>
    </Container>
  );
}
