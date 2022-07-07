import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import './profile-view.scss';

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useState();
}

const favoriteMovieList = movie.filter((movies) => {});

const getUser = () => {};
const handleSubmit = (e) => {};

const removeFav = (id) => {};

const handleUpdate = (e) => {};

useEffect(() => {});

return (
  <div>
    <UserInfo name={user.Username} email={user.Email} />
    <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Edit User Info</h2>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        defaultValue={user.Username}
        onChange={(e) => handleUpdate(e)}
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        defaultValue={user.Password}
        onChange={(e) => handleUpdate(e)}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        defaultValue={user.Email}
        onChange={(e) => handleUpdate(e)}
      />
      <button variant="primary" type="submit">
        Update
      </button>
    </form>
  </div>
);
