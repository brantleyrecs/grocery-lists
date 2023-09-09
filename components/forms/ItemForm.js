/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-extraneous-dependencies */
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
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { createItem, updateItem } from '../../api/itemData';
import { getLists } from '../../api/listData';

const initialState = {
  name: '',
  quantity: 0,
  image_url: '',
  description: '',
  store: '',
  aisle_number: '',
  firebaseKey: '',
  sale: false,
};
function ItemForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [lists, setLists] = useState([]);
  // const [editorResult, setEditResult] = useState(undefined);
  const router = useRouter();
  const { user } = useAuth();

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      setFormInput((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
  };

  useEffect(() => {
    getLists(user.uid).then(setLists);

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

      <Row className="g-2 text-black">
        <Col md>
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
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Quantity">
            <Form.Control
              type="text"
              placeholder="Enter Quantity"
              name="quantity"
              value={formInput.quantity}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
      </Row>

      {/* user image */}
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="me-3"
          />
          {formInput.image && (
          <img
            src={formInput.image}
            alt="profile"
            style={{ height: '250px', width: '250px', borderRadius: '50%' }}
          />
          )}
        </div>
      </Form.Group>

      <FloatingLabel controlId="FloatingTextarea" label="Item Description" className="mb-3 text-black">
        <Form.Control
          type="text"
          placeholder="Enter Item Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
        />
      </FloatingLabel>

      <Row className="g-2 text-black">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid2" label="Store">
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
          <FloatingLabel controlId="floatingInputGrid3" label="Aisle Number">
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

      <FloatingLabel controlId="floatingSelect" label="Select A Grocery List">
        <Form.Select
          aria-label="List"
          name="list_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.list_id}
        >
          <option value="">No List</option>
          {
            lists.map((list) => (
              <>
                <option
                  key={list.firebaseKey}
                  value={list.firebaseKey}
                >
                  {list.name}
                </option>
              </>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <br />

      <Form.Check
        className="text-white mb-3"
        type="checkbox"
        id="sale"
        name="sale"
        label="On Sale?"
        checked={formInput.sale}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked,
          }));
        }}
      />

      <br />
      <Button variant="outline-success" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Item</Button>
      <Link passHref href={`../../item/${obj.firebaseKey}`}>
        <Button variant="outline-success">Cancel</Button>
      </Link>
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
    list_id: PropTypes.string,
    aisle_number: PropTypes.string,
  }),
};

ItemForm.defaultProps = {
  obj: initialState,
};

export default ItemForm;
