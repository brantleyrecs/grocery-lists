/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getItems } from '../api/itemData';
import { useAuth } from '../utils/context/authContext';
import ItemCard from '../components/ItemCard';

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
    <div className="text-center my-4">
      <Link href="/item/new" passHref>
        <Button style={{ marginBottom: '20px' }}>Add New Item</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {items.map((item) => (
          <ItemCard key={item.firebaseKey} itemObj={item} onUpdate={getAllItems} />
        ))}
      </div>
    </div>
  );
}
