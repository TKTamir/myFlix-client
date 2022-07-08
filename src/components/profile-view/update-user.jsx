import React from 'react';

function UpdateUser({ handleUpdate, handleDelete }) {
  return (
    <form className="profile-form">
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
      <button variant="primary" type="submit" onClick={(e) => handleUpdate(e)}>
        Update
      </button>
      <button variant="danger" type="submit" onClick={(e) => handleDelete(e)}>
        Delete
      </button>
    </form>
  );
}
export default UpdateUser;
