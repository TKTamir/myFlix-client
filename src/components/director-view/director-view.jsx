import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Card, CardGroup } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className="director-view">
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>Director: {director.Name}</Card.Title>
              <Card.Text>Bio: {director.Bio}</Card.Text>
              <Card.Text>Birth:{director.Birth}</Card.Text>
              <Button
                className=""
                onClick={() => {
                  onBackClick();
                }}
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
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
export default DirectorView;
