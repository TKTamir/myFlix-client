import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export function Menubar({ user, onLoggedOut }) {
  const handelLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open('/', '_self');
    onLoggedOut(user);
  };

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };
  return (
    <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          AppForMovies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}

            {isAuth() && (
              <Button variant="link" onClick={handelLogOut}>
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Login</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Register</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
