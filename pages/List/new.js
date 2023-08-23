import React from 'react';
import Head from 'next/head';
import ListForm from '../../components/forms/ListForm';

function newList() {
  return (
    <>
      <Head>
        <title>New Grocery List</title>
      </Head>
      <ListForm />
    </>
  );
}

export default newList;
