import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

export default function FavoriteMovies(props) {
  const { movies, FavoriteMovies } = props.FavoriteMovies;

  const FavoriteMoviesId = FavoriteMovies.map((movies) => movies._id);

  const FavoriteMoviesList = movies.filter((movies) => {
    FavoriteMoviesId.includes(movies._id);
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
      <h2>Favorite Movies</h2>
      {FavoriteMoviesList?.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <button variant="secondary" onClick={() => removeFavorite(movies._id)}>
              Remove From List
            </button>
          </div>
        );
      })}
    </Container>
  );
}
