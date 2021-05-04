import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = (good, bad, neutral) => {
    let total = good + bad + neutral
    return (good-bad)/total
  }

  const positive = (good, bad, neutral) => {
    let total = good + bad + neutral
    return good/total*100
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {good+neutral+bad}</p>
      <p>average: {average(good, bad, neutral)} </p>
      <p>positive: {positive(good, bad, neutral)} %</p>
    </div>
  )
}

export default App