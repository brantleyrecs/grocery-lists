import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default function SearchBar({ onKeyUp }) {
  const handleChange = (e) => {
    onKeyUp(e.target.value.toLowerCase());
  };

  return (
    <>
      <Form className="search">
        <div className="search-box">
          <input
            className="form-control"
            id="searchBar"
            name="search"
            placeholder="Search"
            onChange={handleChange}
            type="text"
          />
        </div>
      </Form>
    </>
  );
}

SearchBar.propTypes = {
  onKeyUp: PropTypes.func.isRequired,
};
