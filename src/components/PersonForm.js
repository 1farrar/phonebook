import React from "react";

const PersonForm = (props) => {
  const {
    addPersons,
    newName,
    newNumber,
    nameChangeHandler,
    numberChangeHandler,
  } = props;

  return (
    <form onSubmit={addPersons}>
      <h2>Add a new</h2>
      <div>
        name: <input value={newName} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
