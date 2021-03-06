import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )  
}

const MostVotes = (props) =>  {
  const votes = Object.values(props.votes)
  let result = votes[0];
  let max = 0;

  //No need to check for [0] elem
  for (let i = 1; i < votes.length; i++) {
      if (votes[i] > result) {
          max = i;
          result = votes[i];
      }
  }
  return (
    <div>
      <p>{props.anecdotes[max]}</p>
      <p>has {props.votes[max]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [votes, updateVote] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const [selected, setSelected] = useState(0)

  const updater = (i) => {
    const copy = { ...votes}
    copy[i] += 1
    updateVote(copy)
  }

  const rand = () => {
    return Math.floor(Math.random() * 6)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <p>
        <Button handleClick={() => updater(selected)} text="vote" />
        <Button handleClick={() => setSelected(rand)} text="next anecdote" />
      </p>
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={anecdotes}/>
    </div>

  )
}

export default App