import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
    birthdateErr: '',
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' });
      isReq = false;
    } else if (username.length < 2) {
      setValues({ ...values, usernameErr: 'Username must be 2 characters long' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password Required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must be 6 characters long' });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email must contain @' });
      isReq = false;
    }
    if (!birthdate) {
      setValues({ ...values, birthdateErr: 'Birthdate is required' });
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://appformovies.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthdate: birthdate,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, you may now login');
          window.open('/', '_self'); // '_self' is necassary to the page to open in the current tab
        })
        .catch((e) => {
          console.log('Error in registration process');
        });
    }
  };

  return (
    <Container fluid className="registerContainer text-center my-3 mx-12">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">AppforMovies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Please Register</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="'formBasicUsername'">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter Username"
                      minLength="4"
                      required
                    />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      minLength="8"
                      required
                    />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      required
                    />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicBirthday">
                    <Form.Label>Birthdate: </Form.Label>
                    <Form.Control
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      placeholder="30.01.1990"
                      required
                    />
                    {values.birthdateErr && <p>{values.birthdateErr}</p>}
                  </Form.Group>
                  <Button type="submit" onClick={handleSubmit}>
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};
