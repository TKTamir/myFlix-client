import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Col, Row } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, OnBackClick } = this.props;

    return (
      <Container className="director-view">
        <Row>
          <Col className="movie-director"></Col>
          <Row className="mt-3">
            <Col className="label">Director: </Col>
            <Col className="value">{director.Director.Name}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="label">Bio: </Col>
            <Col className="value">{director.Director.Bio}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="label">Birth: </Col>
            <Col className="value">{director.Director.Birth}</Col>
          </Row>
          <Button
            onClick={() => {
              onBackClick();
            }}
            variant="primary"
          >
            Back
          </Button>
        </Row>
      </Container>
    );
  }
}
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }).isRequired,
};
