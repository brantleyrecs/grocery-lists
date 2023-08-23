/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import Link from 'next/link';
import { viewItemDetails } from '../../api/mergedData';

export default function ViewItem() {
  const [itemDetails, setItemDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewItemDetails(firebaseKey).then(setItemDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{itemDetails.name} Details</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap font">
        <div className="d-flex flex-column">
          <img src={itemDetails.image_url} alt={itemDetails.name} className="img" style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details font">
          <h1 className="font">{itemDetails.name}</h1>
          <Link href={`../list/${itemDetails.listObject?.firebaseKey}`} passHref>
            <h4 className="font link">{itemDetails.listObject?.name}</h4>
          </Link>
          <h4>Qty: {itemDetails.quantity}</h4>
          <h4>{itemDetails.description}</h4>
          <h4>Store: {itemDetails.store}/ Aisle: {itemDetails.aisle_number}</h4>
          <h5>{itemDetails.sale ? '🏷️ Sale' : ''}</h5>
          <Link href={`../item/edit/${itemDetails.firebaseKey}`} passHref>
            <Button variant="outline-warning">Edit Item</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
