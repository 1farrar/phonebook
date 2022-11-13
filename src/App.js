import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  const deletePersonHandler = (id, name) => {
    if (window.confirm(`delete ${name}`)) {
      personService
        .removePerson(id)
        .then(() => {
          setPersons(persons.filter((item) => item.id !== id));
          setMessage({
            text: `${name} was successfully deleted`,
            type: "success",
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setPersons(persons.filter((item) => item.name !== name));
          setMessage({
            text: `${name} has already been deleted`,
            type: "error",
          });
        });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPersons = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      // id: Math.floor(Math.random() * 100),
    };

    if (
      persons.filter((person) => person.name === personObject.name).length > 0
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((item) => item.name === newName);
        const updatedPerson = { ...person, number: newNumber };
        personService
          .updatePerson(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((item) =>
                item.id !== returnedPerson.id ? item : returnedPerson
              )
            );
            setMessage({
              text: `${returnedPerson.name} has been successfully updated`,
              type: "success",
            });
            setTimeout(() => {
              setMessage(null);
            }, 3000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setMessage({
              text: error.response.data.error,
              type: "error",
            });
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
    } else {
      personService
        .createPerson(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage({
            text: `${returnedPerson.name} has been successfully added`,
            type: "success",
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setMessage({
            text: error.response.data.error,
            type: "error",
          });

          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} searchChangeHandler={searchChangeHandler} />

      <PersonForm
        addPersons={addPersons}
        newName={newName}
        newNumber={newNumber}
        nameChangeHandler={nameChangeHandler}
        numberChangeHandler={numberChangeHandler}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        search={search}
        deletePersonHandler={deletePersonHandler}
      />
    </div>
  );
};

export default App;
