import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const Person = ( {person} ) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const AllPersons = (props) => {
  return (
    <div>
      {props.persons.filter(person =>
          person.name.toLowerCase().includes(props.filterName.toLowerCase()) === true).map(person => 
            <Person key={person.name} person={person} />
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
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
      <AllPersons persons={persons} filterName={filterName} />
    </div>
  )

}

export default App