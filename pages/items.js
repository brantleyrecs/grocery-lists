/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { getItems } from '../api/itemData';
import { useAuth } from '../utils/context/authContext';
import ItemCard from '../components/cards/ItemCard';

export default function Items() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  const getAllItems = () => {
    getItems(user.uid).then(setItems);
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
      <Head>
        <title>Grocery Items</title>
      </Head>
      <div className="text-center my-4 cards">
        <Link href="/item/new" passHref>
          <Button variant="outline-primary" style={{ marginBottom: '20px' }}>Add New Item</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <ItemCard key={item.firebaseKey} itemObj={item} onUpdate={getAllItems} />
          ))}
        </div>
      </div>
    </>
  );
}
