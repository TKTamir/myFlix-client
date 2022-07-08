import React, { useState } from 'react';
import { ProfileView } from './profile-view';
import axios from 'axios';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';

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
  //Validate for handleUpdate
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' });
      isReq = false;
    } else if (username.length < 2) {
      setValues({ ...values, usernameErr: 'Username must be 2 characters long' });
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
          window.open('/users/:username', '_self');
        })
        .catch((error) => {
          console.error(error);
          alert('It seems something went wrong');
        });
    }
  };
  return (
    <form className="profile-form">
      <h4>Edit User Info</h4>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Birthdate:</label>
      <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      <Button className="mx-3" variant="primary" type="submit" onClick={(e) => handleUpdate(e)}>
        Update
      </Button>
    </form>
  );
}
