import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ListForm from '../../../components/forms/ListForm';
import { getSingleList } from '../../../api/listData';

export default function EditSingleList() {
  const [editList, setEditList] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleList(firebaseKey).then(setEditList);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Editing {editList.name}</title>
      </Head>
      <ListForm obj={editList} />
    </>
  );
}
