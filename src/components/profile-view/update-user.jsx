import React from 'react';

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
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
  );
}
