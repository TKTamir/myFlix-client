import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Row, Button, Figure, Card } from 'react-bootstrap';
import './profile-view.scss';

export default function FavoriteMovies(props) {
  const { movies, currentUser, token } = props;
  const [favoriteMovies, setFavoriteMovies] = useState('');

  const getUser = (response) => {
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
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
        alert('The movie has been successfuly removed.');
      })
      .catch((error) => console.error(error));
  };

  return (
    <Card className="mx-3 my-3">
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h3>Your favorite movies:</h3>
          </Col>
          {favoriteMovies.length === 0 ? (
            <Col xs={12}>
              <p>You have yet to add a Favorite Movie.</p>{' '}
            </Col>
          ) : (
            favoriteMovies.map((movieId) => {
              let movie = movies.find((m) => m._id === movieId);

              return (
                <Col xs={12} md={6} lg={4} className="fav-movie" key={movie.id}>
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

                    <Link to={`/users/${currentUser}`}>
                      <Button className="button" variant="primary">
                        Open
                      </Button>
                      <Button variant="secondary" onClick={() => removeFavorite(movie._id)}>
                        Remove From Favorites
                      </Button>
                    </Link>
                  </Figure>
                </Col>
              );
            })
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}
