import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Row, Button, Card, Figure } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

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
        setMovies('');
        alert('The movie has been successfuly removed.');
        window.open('/users/:username', '_self');
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      {favoriteMovies.length === 0 ? (
        <p>You have yet to add a Favorite Movie.</p>
      ) : (
        favoriteMovies.map((movie, ImagePath, Title, _id) => {
          return (
            <Card className="movie-card" key={movie._id}>
              <Figure>
                <Link to={`/movies/${_id}`}>
                  <Figure.Image variant="top" src={ImagePath} alt={Title} />
                </Link>
              </Figure>

              <Card.Body>
                <Card.Title>{Title}</Card.Title>
                <Link to={`/movies/${movie._id}`}>
                  <Button className="button" variant="primary">
                    Open
                  </Button>
                  <Button variant="secondary" onClick={() => removeFavorite(movie._id)}>
                    Remove From List
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })
      )}
    </Container>
  );
}
