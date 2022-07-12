import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import moment from 'moment';

export default function UpdateUser(props) {
  const { user } = props;
  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const getUser = () => {
    axios
      .get(`https://appformovies.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setBirthdate(moment(new Date(response.data.Birthdate)).format('yyyy-MM-DD'));
        setEmail(response.data.Email);
        console.log(response);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getUser();
  }, []);

  //Validate for handleUpdate
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' });
      isReq = false;
    } else if (username.length < 4) {
      setValues({ ...values, usernameErr: 'Username must be 4 characters long' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password Required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must be 6 characters long' });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email must contain @' });
      isReq = false;
    }
    if (!birthdate) {
      setValues({ ...values, birthdateErr: 'Birthdate is required' });
      isReq = false;
    }

    return isReq;
  };

  const handleUpdate = () => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    /* Send a request to the server for authentication */
    const isReq = validate();
    if (isReq) {
      axios
        .put(
          `https://appformovies.herokuapp.com/users/${user}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          alert('Profile was successfully updated.');
          localStorage.setItem('user', response.data.Username);
          console.log(response.data);
          window.open('/', '_self');
        })
        .catch((error) => {
          console.error(error);
          alert('It seems something went wrong');
        });
    }
  };
  const handleDelete = (e) => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios
      .delete(`https://appformovies.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert(`The account ${user.Username} has been deleted.`);
        localStorage.clear();
        window.open('/register', '_self');
        console.log(response);
      })
      .catch((error) => console.error(error));
  };
  return (
    <Container className="mx-3 my-3">
      <Form className="profile-form">
        <Form.Group>
          <h4>Edit User Info:</h4>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {values.usernameErr && <p>{values.usernameErr}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            defaultValue={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {values.passwordErr && <p>{values.passwordErr}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {values.emailErr && <p>{values.emailErr}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthdate:</Form.Label>
          <Form.Control
            type="date"
            defaultValue={birthdate}
            required
            onChange={(e) => setBirthdate(e.target.value)}
          />
          {values.birthdateErr && <p>{values.birthdateErr}</p>}
        </Form.Group>

        <Button className="mx-3" variant="primary" onClick={(e) => handleUpdate(e)}>
          Update
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Form>
    </Container>
  );
}
