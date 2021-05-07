import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <div>
    filter shown with <input value={props.filterName} onChange={props.handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange}/>
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Person = ( {person, persons, setPersons} ) => {
  const handleClick = () => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
      .remove(person.id)
      .then(setPersons(persons.filter(someone => someone.id !== person.id)))
    }
  }
  return (
    <p>{person.name} {person.number} 
    <button type="button" onClick={handleClick}>delete</button>
    </p>
  )
}

const AllPersons = (props) => {
  return (
    <div>
      {props.persons.filter(person =>
          person.name.toLowerCase().includes(props.filterName.toLowerCase()) === true).map(person => 
            <Person key={person.name} person={person} persons={props.persons} setPersons={props.setPersons} />
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(persons.some(person => person.name === newName))
    if(persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old phone number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        const personObject = {...oldPerson, number: newNumber}
        personService
        .update(personObject)
        .then(response => {
          setPersons(persons.map(person => person.id === personObject.id ? response : person))
          setNewName('')
          setNewNumber('')
        })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <AllPersons persons={persons} filterName={filterName} setPersons={setPersons} />
    </div>
  )

}

export default App