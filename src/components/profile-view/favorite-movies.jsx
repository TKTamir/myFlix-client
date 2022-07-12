import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Row, Button, Figure } from 'react-bootstrap';

export default function FavoriteMovies(props) {
  const { movies, currentUser, token } = props;
  const [favoriteMovies, setFavoriteMovies] = useState('');

  const getUser = () => {
    axios
      .get(`https://appformovies.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
        console.log(response);
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
        setFavoriteMovies(response.data.FavoriteMovies);
        alert('The movie has been successfuly removed.');
        window.open('/users/:username', '_self');
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h3>Your favorite movies:</h3>
        </Col>
      </Row>
      {favoriteMovies.length === 0 ? (
        <Row>
          <Col xs={12}>
            <p>You have yet to add a Favorite Movie.</p>{' '}
          </Col>
        </Row>
      ) : (
        favoriteMovies.map((movieId) => {
          let movie = movies.find((m) => m._id === movieId);

          return (
            <Row key={movie._id}>
              <Col xs={12} md={6} lg={4}>
                <Figure>
                  <Link to={`/movies/${movie._id}`}>
                    <Figure.Image
                      variant="top"
                      crossOrigin="Anonymous"
                      src={movie.ImagePath}
                      alt={movie.Title}
                    />

                    <Figure.Caption>{movie.Title}</Figure.Caption>
                  </Link>

                  <Link to={`/movies/${movie._id}`}>
                    <Button className="button" variant="primary">
                      Open
                    </Button>
                    <Button variant="secondary" onClick={() => removeFavorite(movie._id)}>
                      Remove From Favorites
                    </Button>
                  </Link>
                </Figure>
              </Col>
            </Row>
          );
        })
      )}
    </Container>
  );
}
