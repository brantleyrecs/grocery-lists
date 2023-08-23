/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { viewListDetails } from '../../api/mergedData';
// import ItemCard from '../../components/cards/ItemCard';
import ItemCheckList from '../../components/cards/ItemCheckList';

export default function SingleList() {
  const [listDetails, setListDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  // useEffect(() => {
  //   viewListDetails(firebaseKey).then(setListDetails);
  // }, [firebaseKey]);

  const listItems = () => {
    viewListDetails(firebaseKey).then(setListDetails);
  };

  useEffect(() => {
    listItems();
  }, []);

  return (
    <>
      <Head>
        <title>{listDetails.name}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap team font">
        <div className="text-white ms-5 details" style={{ textAlign: 'center' }}>
          <h1 style={{ marginRight: '20px' }} className="font">
            {listDetails.name}
          </h1>
          {/* <div style={{ marginBottom: '20px' }}>
            <input
              className="form-control mr-sm-2"
              id="searchItems"
              placeholder="Search Items"
              aria-label="Search"
            />
          </div> */}
          {/* <Button variant="primary" onClick={}>Search</Button> */}
        </div>
      </div>
      <div>
        {listDetails?.items?.map((itemObj) => <ItemCheckList itemObj={itemObj} onUpdate={listItems} />)}
      </div>
      <Link href="/item/new" passHref>
        <Button variant="outline-primary" style={{ marginBottom: '20px' }}>Add New Item</Button>
      </Link>
    </>
  );
}
