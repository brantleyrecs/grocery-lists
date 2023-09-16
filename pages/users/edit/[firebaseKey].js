import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import UserForm from '../../../components/forms/UserForm';
import { getSingleUser } from '../../../api/usersData';

export default function EditSingleList() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleUser(firebaseKey).then(setEditUser);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Editing {editUser.name} Info</title>
      </Head>
      <UserForm obj={editUser} />
    </>
  );
}
