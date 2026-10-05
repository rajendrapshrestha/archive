import React from 'react'

const Person = ({ person, onDelete }) => {
  return (
    <li className="person">{person.name} {person.number}
      <button onClick={onDelete}>delete</button>
    </li>
  )
}

export default Person