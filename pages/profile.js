import React from 'react';
import Head from 'next/head';
import User from '../components/user';

export default function Profile() {
  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <User />
    </>
  );
}
