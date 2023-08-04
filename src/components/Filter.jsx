import React from 'react';
import PropTypes from 'prop-types';

export const Filter = ({ onFilterChange, filter }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <label>
        <input
          type="text"
          name="filter"
          placeholder="Search by name"
          value={filter}
          onChange={onFilterChange}
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
};
