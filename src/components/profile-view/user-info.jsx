import React from 'react';
import { Link } from 'react-router-dom';

function Userinfo(email, username) {
  return (
    <>
      <p>User: {username}</p>
      <p>Email: {email}</p>
    </>
  );
}

export default Userinfo;
