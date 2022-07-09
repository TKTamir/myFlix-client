import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export default function FavoriteMovies(props) {
  const { movies, favoriteMovies, currentUser, token } = props;

  const FavoriteMoviesList = movies.filter((movies) => {
    FavoriteMovies.includes(movies._id);
  });
  console.log(FavoriteMoviesList);

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
      {FavoriteMoviesList?.map((movies) => {
        return (
          <Card className="movie-card">
            <div key={movies._id}>
              <img src={movies.ImagePath} />
              <Link to={`/movies/${movies._id}`}>
                <h4>{movies.Title}</h4>
              </Link>
              <Button variant="secondary" onClick={() => removeFavorite(movies._id)}>
                Remove From List
              </Button>
            </div>
          </Card>
        );
      })}
    </Container>
  );
}
