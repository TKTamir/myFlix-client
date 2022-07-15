import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';
import UserInfo from './user-info';
import './profile-view.scss';
import { Container, Col, Row, Card } from 'react-bootstrap';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions.js';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState({});
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const movies = props.movies;

  const user = this.props.setUser;
  const token = localStorage.getItem('token');

  // const currentUser = localStorage.getItem('user');
  const { currentUser } = this.props.setUser(response.data);

  const getUser = () => {
    axios
      .get(`https://appformovies.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setBirthdate(response.data.Birthdate);
        setFavoriteMovies(response.data.FavoriteMoviesList);
        console.log(response);
        console.log(response.data.movies);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Row className="my-3">
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <FavoriteMovies
          movies={movies}
          favoriteMovies={favoriteMovies}
          currentUser={currentUser}
          token={token}
        />{' '}
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { setUser })(ProfileView);
