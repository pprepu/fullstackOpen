import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}> {text} </button>;
};

const Statistic = ({ text, value }) => (
  <tr>
    <td> {text} </td>
    <td> {value} </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = ((good + bad * -1) / all).toFixed(1);

  const positive = ((good / all) * 100).toFixed(1);

  if (all === 0) {
    return (
      <div>
        <p> No feedback given. </p>
      </div>
    );
  }

  return (
    <div>
      <h1> statistics </h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive.toString().concat(" %")} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedback = () => setGood(good + 1);
  const handleNeutralFeedback = () => setNeutral(neutral + 1);
  const handleBadFeedback = () => setBad(bad + 1);

  return (
    <div>
      <h1> give feedback </h1>
      <div>
        <Button onClick={handleGoodFeedback} text="good" />
        <Button onClick={handleNeutralFeedback} text="neutral" />
        <Button onClick={handleBadFeedback} text="bad" />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
