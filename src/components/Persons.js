import React from "react";

const Persons = (props) => {
  const { persons, search, deletePersonHandler } = props;

  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePersonHandler(person.id, person.name)}>
              delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default Persons;
