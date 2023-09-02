import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Table } from 'react-bootstrap';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BsFillTrash3Fill, BsFillPencilFill } from 'react-icons/bs';
import { deleteItem } from '../../api/itemData';

function ItemCheckList({ itemObj, onUpdate }) {
  const deleteThisItem = () => {
    if (window.confirm(`Are you sure you want to delete ${itemObj.name}?`)) {
      deleteItem(itemObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Table>
        <tbody>
          <tb>
            <Form.Check
              className="text-white mb-3"
              type="checkbox"
              id="checked"
              name="checked"
              label=""
            />
          </tb>
          <tb>{itemObj.quantity}</tb>
          <tb>
            <Link href={`../item/${itemObj.firebaseKey}`} passHref>
              <h3 className="link">{itemObj.name}</h3>
            </Link>
          </tb>
          <tb>{itemObj.store}</tb>
          <tb>{itemObj.aisle_number}</tb>
          <tb>
            <Link href={`../item/edit/${itemObj.firebaseKey}`} passHref>
              <Button className="card-button" variant="outline-warning"><BsFillPencilFill /></Button>
            </Link>
          </tb>
          <tb>
            <Button className="card-button" variant="outline-danger" onClick={deleteThisItem}><BsFillTrash3Fill /></Button>
          </tb>
        </tbody>
      </Table>
      {/* <ul className="item_list">
        <li className="item">
          <Form.Check
            className="text-white mb-3"
            type="checkbox"
            id="checked"
            name="checked"
            label=""
          />
          <h3>{itemObj.quantity}</h3>
          <Link href={`../item/${itemObj.firebaseKey}`} passHref>
            <h3 className="link">{itemObj.name}</h3>
          </Link>
          <h3>{itemObj.store}</h3>
          <h3>{itemObj.aisle_number}</h3>
          <Link href={`../item/edit/${itemObj.firebaseKey}`} passHref>
            <Button className="card-button" variant="outline-warning"><BsFillPencilFill /></Button>
          </Link>
          <Button className="card-button" variant="outline-danger" onClick={deleteThisItem}><BsFillTrash3Fill /></Button>
        </li>
      </ul> */}
    </>
  );
}

ItemCheckList.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    store: PropTypes.string,
    aisle_number: PropTypes.string,
    quantity: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

ItemCheckList.defaultProps = {
  itemObj: {
    name: 'Name',
  },
};

export default ItemCheckList;
