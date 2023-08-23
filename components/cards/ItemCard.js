import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BsFillTrash3Fill, BsFillPencilFill, BsFillEyeFill } from 'react-icons/bs';
import { deleteItem } from '../../api/itemData';

function ItemCard({ itemObj, onUpdate }) {
  const deleteThisItem = () => {
    if (window.confirm(`Are you sure you want to delete ${itemObj.name}?`)) {
      deleteItem(itemObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={itemObj.image_url} alt={itemObj.name} className="img" style={{ height: '200px' }} />
        <br />
        <br />
        <Card.Title>{itemObj.name}</Card.Title>
        <br />
        <Link href={`../item/${itemObj.firebaseKey}`} passHref>
          <Button className="card-button" variant="outline-light"><BsFillEyeFill /></Button>
        </Link>
        <Link href={`../item/edit/${itemObj.firebaseKey}`} passHref>
          <Button className="card-button" variant="outline-warning"><BsFillPencilFill /></Button>
        </Link>
        <Button className="card-button" variant="outline-danger" onClick={deleteThisItem}><BsFillTrash3Fill /></Button>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    image_url: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

ItemCard.defaultProps = {
  itemObj: {
    name: 'Name',
    image_url: 'Image_url',
  },
};

export default ItemCard;
