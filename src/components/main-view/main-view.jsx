import React from 'react';
import axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Menubar } from '../navbar/navbar';

// #0
import { setMovies, setUser } from '../../actions/actions.js';

import MoviesList from '../movies-list/movies-list.jsx';

/*#1 The rest of components import statements but without the MovieCard's 
because it will be imported and used in the MoviesList component rather
than in here. 
*/

import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();

    // #3 movies state removed from here

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  /* When a user logs in, the props onLoggedIn(data) is passed to the LoginView and triggers the function onLoggedIn(authData) in the MainView. This updates the state with the logged in authData.*/

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);
    this.getMovies(authData.token);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
  }

  /* When a user logs out, the props onLoggedout(data) is  revoking the token and setting the user to null.*/
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('');
  }

  onRegister() {
    this.setState({
      isRegistered: false,
    });
  }

  getMovies(token) {
    axios
      .get('https://appformovies.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // #4

  render() {
    // #5 movies is extracted from this.props rather than from the this.state
    let { movies, user } = this.props;

    return (
      <Router>
        <Menubar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col lg={8} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={movies.find((m) => m.Director.Name === match.params.name).Director}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path={`/users/${user}`}
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                return (
                  <Col>
                    <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
            <Route
              path={`/user-update/${user}`}
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                return (
                  <Col>
                    <UpdateUser user={user} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

// #7
let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

// #8
export default connect(mapStateToProps, { setMovies, setUser })(MainView);

// export default MainView;
