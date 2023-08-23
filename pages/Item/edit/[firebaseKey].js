import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ItemForm from '../../../components/forms/ItemForm';
import { getSingleItem } from '../../../api/itemData';

export default function EditSingleItem() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleItem(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Editing {editItem.name}</title>
      </Head>
      <ItemForm obj={editItem} />
    </>
  );
}
