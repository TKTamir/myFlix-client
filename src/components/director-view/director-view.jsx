import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, CardGroup, Container, Col, Row, Form } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends.ReactComponent {
    render(){
        const {director, OnBackClick} = this.props;

        return (
            <Container className="director-view">
            <Row>
              <Col className="movie-director"></Col>
                <Row className="mt-3">
                <Col className="label">Director: </Col>
                <Col className="value">{movie.Director.Name}</Col>
                </Row>
                <Row className="mt-3">
                <div>{' Bio: ' + movie.Director.Bio}</div>
              
                </Row>
                <Row className="mt-3">
                <div>{' Birth: ' + movie.Director.Birth}</div>
                </Row>
          </Row>
          </Container>
        )
    }
}

