/* eslint-disable @next/next/no-img-element */
import React from 'react';
// import Image from 'next/image';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
// import UserForm from './forms/UserForm';
import { createUser, updateUser } from '../api/usersData';

export default function User() {
  const { user } = useAuth();

  const userInfo = (obj) => {
    if (obj.firebaseKey) {
      updateUser();
    } else {
      createUser();
    }
  };

  return (
    <div className="text-light text-center profile">
      <img
        src={user.photoURL}
        alt="userURL"
        className="img"
        width="200px"
        height="200px"
      />
      <br />
      <br />
      <h2>{user.displayName}</h2>
      <br />
      <h3>{user.email}</h3>
      <br />
      <h3>{user.metadata.lastSignInTime}</h3>
      <br />
      <Link href="/users/new" passHref>
        <Button type="button" size="lg" variant="outline-primary">User Info for Sharing</Button>
      </Link>
      <br />
      <br />
      <Button type="button" size="lg" variant="outline-danger" className="btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
