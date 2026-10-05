import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <div>
    filter show with
    <input
      value={props.filter}
      onChange={props.onChange}
    />
  </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
        <div>
          name:
          <input
            value={props.name}
            onChange={props.onNameChange}
          /> <br/>
          number:
          <input
            value={props.number}
            onChange={props.onNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Notification = ({ message }) => {
  if (message == null || message === '') {
    return null
  }

  return (
    <div className="info">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some( person => person.name === newName )) {
      if (window.confirm(newName + " is already added to the phonebook, replace the old number with a new one?")) {
      personObject.id = persons.find(person => person.name === personObject.name).id
      personService
        .update(personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        })
        .catch(error => {
          alert(`Cannot update phone number for {$newName}`)
        })
      }

    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage('Added ' + returnedPerson.name)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
      .catch(error => {
        setMessage('Error ' + error.response.data.error)
        console.log(error.response.data.error)
      })
    }
  }

  const deletePerson = (id) => {
    personService
    .deletePerson(id)
    .catch(error => {
      alert(`the person with id {id} cannot be deleted`)
    })
    setPersons(persons.filter(n => n.id !== id))
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(
        person => newFilter==='' || person.name.toLowerCase().includes(
            newFilter.toLowerCase()
        )
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={newFilter} onChange={handleFilterChange} />

      <h2>add a New</h2>
      <PersonForm 
        onNameChange={handlePersonChange} 
        onNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}  
        onSubmit={addPerson}
      />      

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Person 
            key={person.name} 
            person={person} 
            onDelete={() => deletePerson(person.id)} />
        )}
      </ul>
    </div>
  )
}

export default App