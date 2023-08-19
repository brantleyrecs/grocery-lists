import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

function ItemCard({ itemObj }) {
  return (
    <Card>
      <Card.Img variant="top" src={itemObj.image_url} alt={itemObj.name} style={{ height: '200px' }} />
      <br />
      <Card.Body>
        <Card.Title>{itemObj.name}</Card.Title>
        <br />
        <Link href={`../item/${itemObj.firebaseKey}`} passHref>
          <Button className="card-button" variant="primary">View Item</Button>
        </Link>
        <Link href={`../item/edit/${itemObj.firebaseKey}`} passHref>
          <Button className="card-button" variant="primary">Edit Button</Button>
        </Link>
        <Button className="card-button" variant="danger">Delete</Button>
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
};

ItemCard.defaultProps = {
  itemObj: {
    name: 'Name',
    image_url: 'Image_url',
  },
};

export default ItemCard;
