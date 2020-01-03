import React from "react";

const Persons = ({ showPersons }) => {
  return (
    <ul>{showPersons()}</ul>
  )
}

export default Persons;