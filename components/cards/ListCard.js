import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useAuth } from '../../utils/context/authContext';
// eslint-disable-next-line import/no-unresolved
import { deleteSingleList } from '../../api/listData';

function ListCard({ listObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisItem = () => {
    if (window.confirm(`Are you sure you want to delete ${listObj.name}?`)) {
      deleteSingleList(listObj.firebaseKey).then(() => onUpdate());
    }
  };

  const ogUser = () => {
    if (user.uid === listObj.uid) {
      return (
        <Button variant="outline-danger" onClick={deleteThisItem} className="delete">
          <BsFillTrash3Fill />
        </Button>
      );
    }
    return ('');
  };

  return (
    <div className="single_list ">
      <Link href={`../list/${listObj.firebaseKey}`} passHref>
        <h3 className="single_list link">
          {listObj.name}
        </h3>
        <div className="date">Created: {listObj.date}</div>
      </Link>
      {ogUser()}
    </div>
  );
}

ListCard.propTypes = {
  listObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    date: PropTypes.string,
    list_id: PropTypes.string,
    userObject: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

ListCard.defaultProps = {
  listObj: {
    name: 'List Name',
  },
};

export default ListCard;
