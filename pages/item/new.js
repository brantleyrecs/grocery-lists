import React from 'react';
import Head from 'next/head';
import ItemForm from '../../components/forms/ItemForm';

export default function NewItem() {
  return (
    <>
      <Head>
        <title>New Grocery Item</title>
      </Head>
      <ItemForm />
    </>
  );
}
