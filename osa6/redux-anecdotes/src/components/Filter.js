import React from 'react'
//import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  //const dispatch = useDispatch()
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    console.log(event.target.value);
    //dispatch(filterAnecdotes(event.target.value))
    props.filterAnecdotes(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnectedFilter = connect(
  null,
  { filterAnecdotes }
)(Filter)

export default ConnectedFilter