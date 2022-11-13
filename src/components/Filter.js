import React from "react";

const Filter = (props) => {
  const { search, searchChangeHandler } = props;

  return (
    <div>
      filter shown with <input value={search} onChange={searchChangeHandler} />
    </div>
  );
};

export default Filter;
