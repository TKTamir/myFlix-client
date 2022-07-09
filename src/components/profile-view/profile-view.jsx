import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';
import './profile-view.scss';
import { Container, Col, Row, Button } from 'react-bootstrap';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState({});
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [user, setUser] = useState(props.user);
  const token = localStorage.getItem('token');
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

  const currentUser = localStorage.getItem('user');

  const getUser = () => {
    axios
      .get(`https://appformovies.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setBirthdate(response.data.Birthdate);
        setFavoriteMoviesList(response.data.FavoriteMoviesList);
        console.log(response);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Row>
        <h3>Your profile</h3>
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
      <Row className="mt-3">
        <h5>Your favourite movies</h5>
      </Row>
      <Row>
        <UpdateUser />
      </Row>
      <Row>
        <FavoriteMovies />
      </Row>
    </Container>
  );
}
