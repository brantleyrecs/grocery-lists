/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import Head from 'next/head';
import Link from 'next/link';
import { viewItemDetails } from '../../api/mergedData';
import { deleteItem } from '../../api/itemData';

export default function ViewItem({ itemObj, onUpdate }) {
  const [itemDetails, setItemDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const deleteThisItem = () => {
    if (window.confirm(`Are you sure you want to delete ${itemObj.name}?`)) {
      deleteItem(itemObj.firebaseKey).then(() => onUpdate());
    }
  };

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
          <img src={itemDetails.image} alt={itemDetails.name} className="img" style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details font">
          <h1 className="font">{itemDetails.name}</h1>
          <Link href={`../list/${itemDetails.listObject?.firebaseKey}`} passHref>
            <h4 className="font link">{itemDetails.listObject?.name}</h4>
          </Link>
          <h4>Qty: {itemDetails.quantity}</h4>
          <h4>{itemDetails.description}</h4>
          <h4>Store: {itemDetails.store} / Aisle: {itemDetails.aisle_number}</h4>
          <h5>{itemDetails.sale ? '🏷️ Sale' : ''}</h5>
          <Link href={`../item/edit/${itemDetails.firebaseKey}`} passHref>
            <Button variant="outline-warning"><BsFillPencilFill /></Button>
          </Link>
          <Button className="card-button" variant="outline-danger" onClick={deleteThisItem}><BsFillTrash3Fill /></Button>
        </div>
      </div>
    </>
  );
}

ViewItem.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

ViewItem.defaultProps = {
  itemObj: {
    name: 'Name',
  },
};
