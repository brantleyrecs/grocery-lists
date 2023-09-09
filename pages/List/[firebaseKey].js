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
  Spinner,
} from 'react-bootstrap';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';
import Link from 'next/link';
import Head from 'next/head';
import { viewListDetails } from '../../api/mergedData';
// import ItemCard from '../../components/cards/ItemCard';
// import ItemCheckList from '../../components/cards/ItemCheckList';
// import SearchBar from '../../components/SearchBar';

export default function SingleList() {
  const [listDetails, setListDetails] = useState([]);
  const [search, setSearch] = useState('');
  // const [state, setState] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  // useEffect(() => {
  //   viewListDetails(firebaseKey).then(setListDetails);
  // }, [firebaseKey]);

  const listItems = (key) => {
    viewListDetails(key).then(setListDetails);
  };

  useEffect(() => {
    listItems(firebaseKey);
  }, [firebaseKey]);

  // const filterResult = (query) => {
  //   if (!query) {
  //     listItems(firebaseKey);
  //   } else {
  //     const search = listDetails.items.filter((item) => item.store.toLowerCase().includes(query) || item.name.toLowerCase().includes(query));
  //     setListDetails(search);
  //   }
  // };

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
            <Button className="card-button" variant="outline-light"><FiShare /></Button>
          </div>
          {/* <SearchBar onKeyUp={(query) => filterResult(query)} /> */}
          <Form>
            <InputGroup className="my-3">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
            </InputGroup>
          </Form>
          {/* <div style={{ marginBottom: '20px' }}>
            <input
              className="form-control mr-sm-2"
              id="searchItems"
              placeholder="Search Items"
              aria-label="Search"
            />
          </div> */}
          {/* <Button variant="primary" onClick={}>Search</Button> */}
        </div>
      </div>
      <div>
        <Table striped borderless hover variant="dark">
          <thead>
            <tr>
              <th>Grabbed</th>
              <th>Quantity</th>
              <th>Item</th>
              <th>Store</th>
              <th>Aisle</th>
              <th>Edit</th>
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
                      // onChange={() => handleChecked()}
                      checked={item.checked}
                      id="checked"
                      name="checked"
                      label=""
                    />
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <Link href={`../item/${item.firebaseKey}`} passHref>
                      <h3 className="link" style={(Form.Check.value) ? { textDecoration: 'line-through' } : null}>{item.name}</h3>
                    </Link>
                  </td>
                  <td>{item.store}</td>
                  <td>{item.aisle_number}</td>
                  <td>
                    <Link href={`../item/edit/${item.firebaseKey}`} passHref>
                      <Button className="card-button" variant="outline-warning"><BsFillPencilFill /> <Spinner animation="border" size="sm" variant="warning" /></Button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {/* <div>
        {listDetails?.items?.filter((item) => {
          return search.toLowerCase() === ''
            ? item : item.name.toLowerCase().includes(search) || item.store.toLowerCase().includes(search);
        })
          .map((itemObj) => <ItemCheckList key={itemObj.firebaseKey} itemObj={itemObj} onUpdate={listItems} />)}
      </div> */}
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
