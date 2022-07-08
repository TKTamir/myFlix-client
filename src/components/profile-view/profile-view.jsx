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
  const [currentUser, setUser] = useState('');
  const [token, setToken] = useState('');
  const [email, SetEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [FavoriteMovies, setFavoriteMovies] = useState([]);

  const getUser = () => {
    axios
      .get(`'https://appformovies.herokuapp.com/users/${currentUser}}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setToken(response.data);
        SetEmail(response.data);
        setBirthdate(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    const isReq = validate();
    if (isReq) {
      axios
        .put(
          `https://appformovies.herokuapp.com/users/${currentUser.Username}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate,
            FavoriteMovies: FavoriteMovies,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert('Profile was successfully updated.');
          window.open('/users/:username', '_self');
        })
        .catch((error) => {
          console.error(error);
          alert('It seems something went wrong');
        });
    }
  };

  const handleDelete = (e) => {
    axios
      .delete(`https://movime-api.herokuapp.com/users/${currentUser.username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`The account ${user.Username} has been deleted.`);
        localStorage.clear();
        window.open('/register', '_self');
      })
      .catch((error) => console.error(error));
  };

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
      <UserInfo name={currentUser.Username} email={currentUser.Email} />
      <FavoriteMovies FavoriteMovies={FavoriteMovies} removeFavorite={removeFavorite} />
      <UpdateUser handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </Container>
  );
}
