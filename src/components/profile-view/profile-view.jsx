import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserInfo from './user-info';
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
      .get(`'https://appformovies.herokuapp.com/users/${currentUser}}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setFavoriteMoviesList(response.data.FavoriteMovies);
        console.log(response);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = (e) => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios
      .delete(`https://appformovies.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert(`The account ${user.Username} has been deleted.`);
        localStorage.clear();
        window.open('/register', '_self');
        console.log(response);
      })
      .catch((error) => console.error(error));
  };
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
        <Col className="label">Birthday:</Col>
        <Col className="value">{user.Birthdate}</Col>
      </Row>
      <Row className="mt-3">
        <h5>Your favourite movies</h5>
      </Row>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
      <FavoriteMovies />
      <UpdateUser />
    </Container>
  );
}
// handleUpdate={handleUpdate} handleDelete={handleDelete}
{
  /* <UserInfo /> */
}
{
  /* <FavoriteMovies FavoriteMovies={currentUser.FavoriteMovies} removeFavorite={removeFavorite} /> */
}
