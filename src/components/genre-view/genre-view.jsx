import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container, CardGroup, Card } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container className="genre-view">
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>Genre: {genre.Name}</Card.Title>
              <Card.Text>Description: {genre.Description}</Card.Text>
              <Button
                onClick={() => {
                  onBackClick();
                }}
                variant="primary"
              >
                Back
              </Button>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    );
  }
}
GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
