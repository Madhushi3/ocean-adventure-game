
import { useState } from 'react';
import { getFishQuestion } from './api';
import './App.css';

function App() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  async function startGame() {
    setLoading(true);
    setMessage('');
    setAnswer('');

    try {
      const data = await getFishQuestion();
      setQuestion(data);
    } catch (error) {
      setMessage('Could not load question. Please try again!');
    }

    setLoading(false);
  }

  function checkAnswer() {
    if (answer.trim() === '') {
      setMessage('Please enter your answer!');
    } else if (Number(answer) === Number(question.fish)) {
      setMessage('Correct! You earned a star! ⭐');
      setScore(score + 1);
    } else {
      setMessage('Try again, little explorer!');
    }
  }

  return (
    <div className="game-container">

      <header className="game-header">
        <h1>🐠 Ocean Adventure</h1>
        <p>Explore the ocean and collect treasures!</p>
        <div className="score">⭐ Stars: {score}</div>
      </header>

      {!question ? (
        <main className="home-card">

          <div className="ocean-scene">
            <span className="fish fish-one">🐠</span>
            <span className="fish fish-two">🐟</span>
            <span className="fish fish-three">🐡</span>
            <span className="starfish">⭐</span>
            <span className="shell">🐚</span>
            <span className="treasure">💎</span>
            <span className="chest">🪸</span>
            <span className="bubble bubble-one">○</span>
            <span className="bubble bubble-two">○</span>
            <span className="bubble bubble-three">○</span>
          </div>

          <h2>Welcome, Little Explorer!</h2>

          <p>
            Dive into the magical ocean, discover cute fish
            and collect amazing treasures!
          </p>

          <button onClick={startGame} disabled={loading}>
            {loading ? 'Loading...' : 'Start Adventure 🚀'}
          </button>

          <p className="message">{message}</p>

        </main>
      ) : (
        <main className="game-card">

          <h2>🐟 Count the Fish!</h2>

          <img
            src={question.question}
            alt="Count the fish"
            className="question-image"
          />

          <p>How many fish can you see?</p>

          <input
            type="number"
            min="0"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
          />

          <br />

          <button onClick={checkAnswer}>
            Submit Answer
          </button>

          <p className="message">{message}</p>

          <button className="next-button" onClick={startGame}>
            Next Question ➜
          </button>

          <button className="home-button" onClick={() => {
            setQuestion(null);
            setMessage('');
            setAnswer('');
          }}>
            🏠 Home
          </button>

        </main>
      )}

      <footer>
        🌊 Keep Exploring • Keep Learning • Have Fun!
      </footer>

    </div>
  );
}

export default App;
