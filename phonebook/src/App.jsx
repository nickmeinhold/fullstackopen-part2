import { useState, useEffect } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import personsService from "./services/personsService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    personsService.getAll().then((data) => {
      console.log(`promise fulfilled, data: ${data}`);
      setPersons(data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addOrUpdatePerson = (event) => {
    event.preventDefault();

    const nameToAdd = newName.trim();

    const person = persons.find(
      (p) => p.name.trim().toLowerCase() === nameToAdd.toLowerCase()
    );

    if (person) {
      let confirmed = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmed) {
        setPersons(
          persons.map((p) =>
            person.id === p.id
              ? { number: newNumber, name: newName, id: p.id }
              : p
          )
        );
        personsService
          .update(person.id, {
            name: newName,
            number: newNumber,
          })
          .then((response) => {
            console.log(response);
          });
      }
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      personsService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  const deletePerson = (personToDelete) => {
    let userConfirmed = window.confirm(`Delete ${personToDelete.name}`);
    if (userConfirmed) {
      personsService.deletePerson(personToDelete.id).then((response) => {
        console.log(response);
        setPersons(persons.filter((person) => person.id !== personToDelete.id));
      });
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleFilterChange={handleFilterChange}
        filter={newFilter}
      ></Filter>
      <h1>Add a new</h1>
      <PersonForm
        addOrUpdatePerson={addOrUpdatePerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={newFilter}
        deletePerson={deletePerson}
      ></Persons>
    </div>
  );
};

export default App;
