import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function UserCard({ userObj }) {
  return (
    <div className="single_list ">
      <Link href={`../list/${userObj.firebaseKey}`} passHref>
        <h3 className="single_list link">
          {userObj.name}
          <div className="date">Created: {userObj.date}</div>
        </h3>
      </Link>
    </div>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    date: PropTypes.string,
  }),
  // onUpdate: PropTypes.func.isRequired,
};

UserCard.defaultProps = {
  userObj: {
    name: 'Name',
  },
};

export default UserCard;
