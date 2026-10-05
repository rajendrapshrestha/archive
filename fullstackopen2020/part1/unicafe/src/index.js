import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => {
  return (
    <>
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let all  = good + neutral + bad
  let avg = (good - bad)/all
  let positive = (good/all) * 100
  let positiveText = positive + " %"
  if (all > 0) {
  return (
    <div>
      <h2>Statistics</h2>
      <table><tbody>
      <Statistic text="good" value={good} /> 
      <Statistic text="neutral" value={neutral} /> 
      <Statistic text="bad" value={bad} /> 
      <Statistic text="all" value={all} /> 
      <Statistic text="average" value={avg} /> 
      <Statistic text="positive" value={positiveText} /> 
      </tbody></table>
    </div>
  )
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        No feedback given
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  

  return (
    <div>
      <Header text="Give Feedback" />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)