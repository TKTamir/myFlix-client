import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
    };
  }

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  addFavorite(movie, user) {
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    console.log(movie);
    console.log(token);

    axios
      .post(
        `https://appformovies.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has beeen added to your favorites.`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeFavorite = (movie, user) => {
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    axios
      .delete(`https://appformovies.herokuapp.com/users/${username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has been removed from your favorites.`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { movie, user, onBackClick } = this.props;

    return (
      <Container fluid className="movieViewContainer">
        <Row>
          <Col>
            <div className="movie-poster">
              <img crossOrigin="anonymous" src={movie.ImagePath} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-releaseyear">
              <span className="label">ReleaseYear: </span>
              <span className="value">{movie.ReleaseYear}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-runtime">
              <span className="label">RunTime: </span>
              <span className="value">{movie.RunTime}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-genre">
              <span className="label">Genre: </span>
              <span className="value">{movie.Genre.Name} </span>
            </div>
            <div>{' Description: ' + movie.Genre.Description}</div>
          </Col>
        </Row>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <Row>
          <Col>
            <Button
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
            <Button
              className="ml-2 my-2"
              onClick={() => {
                this.addFavorite(movie, user);
              }}
            >
              Add to Favorites
            </Button>
            <Button
              className="ml-2"
              onClick={() => {
                this.removeFavorite(movie, user);
              }}
            >
              Remove from Favorites
            </Button>
          </Col>
        </Row>
      </Container>
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
  onBackClick: PropTypes.func.isRequired,
};
