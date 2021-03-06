import React, { useState } from 'react'

const StatisticLine = (props) => {
  return (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  )
}

const Statistics = (props) => {
  const total = (props.good + props.bad + props.neutral)
  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </>
    )
  }

  const average = (props.good - props.bad)/total
  const positive = props.good/total*100 + " %"
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good " value={props.good} />
          <StatisticLine text="neutral " value={props.neutral} />
          <StatisticLine text="bad " value={props.bad} />
          <StatisticLine text="total " value={total} />
          <StatisticLine text="average " value={average} />
          <StatisticLine text="positive " value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )  
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

export default App