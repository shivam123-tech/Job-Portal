import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user?.name}</p>
    </div>
  );
};

export default Profile;