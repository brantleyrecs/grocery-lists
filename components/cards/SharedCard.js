import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function SharedCard({ sharedListObj }) {
  return (
    <div className="single_list ">
      <Link href={`../list/${sharedListObj.firebaseKey}`} passHref>
        <h3 className="single_list link">
          {sharedListObj.name}
          <div className="date">Created: {sharedListObj.date}</div>
        </h3>
      </Link>
    </div>
  );
}

SharedCard.propTypes = {
  sharedListObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    date: PropTypes.string,
  }),
};

SharedCard.defaultProps = {
  sharedListObj: {
    name: 'List Name',
  },
};

export default SharedCard;
