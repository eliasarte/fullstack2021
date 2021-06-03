import React from 'react'
//import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
	//const dispatch = useDispatch()
  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //dispatch(createAnecdote(content))
    //dispatch(setNotification(`New anecdote \'${content}\' created`, 5))
    props.createAnecdote(content)
    props.setNotification(`New anecdote \'${content}\' created`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={create}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
        </form>
    </div>
  )
}

const ConnectedAnecdoteForm = connect(
  null,
  { createAnecdote, setNotification },
)(AnecdoteForm)

export default ConnectedAnecdoteForm