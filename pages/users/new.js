import React from 'react';
import Head from 'next/head';
import UserForm from '../../components/forms/UserForm';

function newUser() {
  return (
    <>
      <Head>
        <title>New User</title>
      </Head>
      <UserForm />
    </>
  );
}

export default newUser;
