import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createList, updateList } from '../../api/listData';
import { getUsers } from '../../api/usersData';

const initialState = {
  name: '',
  firebaseKey: '',
  date: '',
  user_id: '',
};

function ListForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [dbUsers, setDbUsers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getUsers().then(setDbUsers);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateList(formInput).then(() => router.push(`/list/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, date: format(new Date(), 'MMM do yyy') };
      createList(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateList(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} List</h1>

      <FloatingLabel controlId="FloatingInput1" label="List Name" className="mb-3 text-black">
        <Form.Control
          type="text"
          placeholder="Enter List Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Select A User to Share With">
        <Form.Select
          aria-label="Users"
          name="user_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.user_id}
        >
          <option value="">No User</option>
          {
            dbUsers.map((objUser) => (
              <>
                <option
                  key={objUser.firebaseKey}
                  value={objUser.uid}
                >
                  {objUser.name}
                </option>
              </>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      <br />
      <Button variant="outline-success" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} List</Button>
    </Form>
  );
}

ListForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    user_id: PropTypes.string,
  }),
};

ListForm.defaultProps = {
  obj: initialState,
};

export default ListForm;
