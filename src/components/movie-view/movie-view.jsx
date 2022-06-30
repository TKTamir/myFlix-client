import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keyperess', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-releaseyear">
          <span className="label">ReleaseYear: </span>
          <span className="value">{movie.ReleaseYear}</span>
        </div>
        <div className="movie-runtime">
          <span className="label">RunTime: </span>
          <span className="value">{movie.RunTime}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">
            {movie.Director.Name +
              ' Bio: ' +
              movie.Director.Bio +
              ' Birth: ' +
              movie.Director.Birth}
          </span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">
            {movie.Genre.Name + ' Description: ' + movie.Genre.Description}
          </span>
        </div>

        <button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    RunTime: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string,
  }).isRequired,
};
