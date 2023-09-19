/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { getLists, getListShared } from '../api/listData';
import { useAuth } from '../utils/context/authContext';
import ListCard from '../components/cards/ListCard';
import UserCard from '../components/cards/UserCard';

function Home({ obj }) {
  const [lists, setLists] = useState([]);
  const [sharedList, setSharedList] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getAllSharedList = () => {
    getListShared(obj.firebaseKey).then(setSharedList);
  };

  const getAllLists = () => {
    getLists(user.uid).then(setLists);
  };

  useEffect(() => {
    getAllSharedList(firebaseKey);
    getAllLists();
  }, [user.uid, firebaseKey]);

  return (
    <>
      <Head>
        <title>2nd Brain</title>
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
          {sharedList.map((shared) => (
            <UserCard key={shared.firebaseKey} userObj={shared} onUpdate={getAllSharedList} />
          ))}
        </div>
      </div>
    </>
  );
}

Home.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

Home.defaultProps = {
  obj: {
    name: 'Name',
  },
};

export default Home;
