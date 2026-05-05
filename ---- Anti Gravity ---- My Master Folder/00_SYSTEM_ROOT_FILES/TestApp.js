import React, { useState } from 'react';

function App() {
  const [number] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  function checkGuess() {
    const numGuess = Number(guess);
    if (numGuess === number) {
      setMessage('Correct');
    } else if (numGuess < number) {
      setMessage('Too low');
    } else {
      setMessage('Too high');
    }
  }

  return (
    <div>
      <h1>Guess the Number Game</h1>
      <p>Guess a number from 1 to 10</p>
      <input
        aria-label="guess-input"
        value={guess}
        onChange={e => setGuess(e.target.value)}
        type="number"
        min="1"
        max="10"
      />
      <button onClick={checkGuess}>Guess</button>
      <p>{message}</p>
    </div>
  );
}

export default App;