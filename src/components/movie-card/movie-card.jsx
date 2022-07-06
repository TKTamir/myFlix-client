import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container fluid className="movieCardContainer">
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string,
//     Description: PropTypes.string.isRequired,
//     ReleaseYear: PropTypes.string.isRequired,
//     RunTime: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string.isRequired,
//     }),
//     ImagePath: PropTypes.string,
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired,
// };
