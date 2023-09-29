/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  InputGroup,
  Table,
} from 'react-bootstrap';
// import { BsFillPencilFill } from 'react-icons/bs';
import Link from 'next/link';
import Head from 'next/head';
import { viewListDetails } from '../../api/mergedData';

export default function SingleList() {
  const [listDetails, setListDetails] = useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { firebaseKey } = router.query;

  const listItems = (key) => {
    viewListDetails(key).then(setListDetails);
  };

  useEffect(() => {
    listItems(firebaseKey);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{listDetails.name}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap team font">
        <div className="text-white ms-5 details" style={{ textAlign: 'center' }}>
          <div>
            <h1 style={{ marginRight: '20px' }} className="font">
              {listDetails.name}
            </h1>
          </div>
          <Form>
            <InputGroup className="my-3">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
            </InputGroup>
          </Form>
        </div>
      </div>
      <div>
        <Table striped borderless variant="dark">
          <thead>
            <tr>
              <th>Grabbed</th>
              <th>Quantity</th>
              <th>Item</th>
              <th>Store</th>
              <th>Aisle</th>
            </tr>
          </thead>
          <tbody>
            {listDetails?.items?.filter((item) => {
              return search.toLowerCase() === ''
                ? item : item.name.toLowerCase().includes(search) || item.store.toLowerCase().includes(search);
            })
              .map((item) => (
                <tr key={item.firebaseKey} className="items">
                  <td>
                    <Form.Check
                      className="text-white mb-3"
                      type="checkbox"
                      checked={item.checked}
                      id="checked"
                      name="checked"
                      label=""
                    />
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <Link href={`../item/${item.firebaseKey}`} passHref>
                      <h4 className="link" style={(Form.Check.value) ? { textDecoration: 'line-through' } : null}>{item.name}</h4>
                    </Link>
                  </td>
                  <td>{item.store}</td>
                  <td>{item.aisle_number}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <Link href="/item/new" passHref>
        <Button variant="outline-primary" style={{ marginBottom: '20px' }}>Add New Item</Button>
      </Link>
    </>
  );
}

SingleList.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

SingleList.defaultProps = {
  itemObj: {
    name: 'Name',
  },
};
