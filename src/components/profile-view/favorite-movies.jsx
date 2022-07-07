import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function FavoriteMovies(props) {
  const { movies, FavoriteMovies } = props.FavoriteMovies;

  const FavoriteMoviesId = FavoriteMovies.map((movies) => movies._id);

  const FavoriteMoviesList = movies.filter((movies) => {
    FavoriteMoviesId.includes(movies._id);
  });
  console.log(FavoriteMoviesList);

  return (
    <>
      <div>
        <h2>Favorite Movies</h2>
        {favoriteMovieList?.map((movies) => {
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
      </div>
    </>
  );
}

export default FavoriteMovies;
