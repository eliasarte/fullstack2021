import React, { useState } from 'react'

const Person = ( {person} ) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
        name: newName
      }
      setPersons(persons.concat(personObject))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
    </div>
  )

}

export default App