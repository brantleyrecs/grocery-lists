import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BsFillTrash3Fill } from 'react-icons/bs';
import { deleteSingleList } from '../../api/listData';
// import Date from '../date';

function ListCard({ listObj, onUpdate }) {
  const deleteThisItem = () => {
    if (window.confirm(`Are you sure you want to delete ${listObj.name}?`)) {
      deleteSingleList(listObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Link href={`../list/${listObj.firebaseKey}`} passHref>
      <h3 className="single_list link">
        {listObj.name}
        {/* <Date dateString={listObj.date} /> */}
        <Button variant="outline-danger" onClick={deleteThisItem} className="delete">
          <BsFillTrash3Fill />
        </Button>
      </h3>
    </Link>
  );
}

ListCard.propTypes = {
  listObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    date: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

ListCard.defaultProps = {
  listObj: {
    name: 'List Name',
  },
};

export default ListCard;