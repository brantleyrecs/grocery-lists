import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  FloatingLabel,
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createItem, updateItem } from '../../api/itemData';

const initialState = {
  name: '',
  image_url: '',
  description: '',
  store: '',
  aisle_number: '',
  firebaseKey: '',
};

function ItemForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateItem(formInput).then(() => router.push(`/item/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateItem(patchPayload).then(() => {
          router.push('/items');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Item</h1>

      <FloatingLabel controlId="FloatingInput1" label="Item Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Item Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="FloatingInput2" label="Item Image URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Item Image URL"
          name="image_url"
          value={formInput.image_url}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="FloatingTextarea" label="Item Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Item Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
        />
      </FloatingLabel>

      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Store">
            <Form.Control
              type="text"
              placeholder="Enter Store"
              name="store"
              value={formInput.store}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Aisle Number">
            <Form.Control
              type="text"
              placeholder="Enter Aisle Number"
              name="aisle_number"
              value={formInput.aisle_number}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <br />
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Item</Button>
    </Form>
  );
}

ItemForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image_url: PropTypes.string,
    firebaseKey: PropTypes.string,
    description: PropTypes.string,
    store: PropTypes.string,
    aisle_number: PropTypes.string,
  }),
};

ItemForm.defaultProps = {
  obj: initialState,
};

export default ItemForm;
