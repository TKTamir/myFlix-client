import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';
import './profile-view.scss';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [FavoriteMovies, setFavoriteMovies] = useState([]);
  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('user');

  const getUser = () => {
    axios
      .get(`'https://appformovies.herokuapp.com/users/${currentUser}}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getUser();
  }, []);

  const removeFavorite = (movieId) => {
    axios
      .delete(`https://appformovies.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('The movie has been successfuly removed.');
        window.open('/users/:username', '_self');
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      {/* <UserInfo /> */}
      {/* <FavoriteMovies FavoriteMovies={currentUser.FavoriteMovies} removeFavorite={removeFavorite} /> */}
      <UpdateUser />
    </Container>
  );
}
// handleUpdate={handleUpdate} handleDelete={handleDelete}
