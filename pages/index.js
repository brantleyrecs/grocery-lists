/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { getLists } from '../api/listData';
import { useAuth } from '../utils/context/authContext';
import ListCard from '../components/cards/ListCard';

function Home() {
  const [lists, setLists] = useState([]);
  const { user } = useAuth();

  const getAllLists = () => {
    getLists(user.uid).then(setLists);
  };

  useEffect(() => {
    getAllLists();
  }, []);

  return (
    <>
      <Head>
        <title>Grocery Lists</title>
      </Head>
      <div
        className="text-center d-flex justify-content-center align-content-center"
        style={{
          height: '150px',
          padding: '30px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.displayName}! </h1>
      </div>
      <div className="text-center my-4">
        <Link href="/list/new" passHref>
          <Button variant="outline-primary">Add A New List</Button>
        </Link>
        <div className="lists">
          {lists.map((list) => (
            <ListCard key={list.firebaseKey} listObj={list} onUpdate={getAllLists} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
