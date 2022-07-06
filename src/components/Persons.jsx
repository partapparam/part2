import React from "react"

const Persons = ({ person, deleteProps }) => {
  return (
    <li>
      {person.name} + {person.number}
      <button onClick={deleteProps}>Delete</button>
    </li>
  )
}

export default Persons
