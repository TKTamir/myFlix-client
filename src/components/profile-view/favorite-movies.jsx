import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap';

export default function FavoriteMovies(props) {
  const [movies, setMovies] = useState([]);

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
        setMovies('');
        alert('The movie has been successfuly removed.');
        window.open('/users/:username', '_self');
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <h2>Favorite Movies</h2>
      {FavoriteMoviesList?.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <Button variant="secondary" onClick={() => removeFavorite(movies._id)}>
              Remove From List
            </Button>
          </div>
        );
      })}
    </Container>
  );
}
