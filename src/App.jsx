import { useState } from 'react';
import { getFishQuestion } from './api';
import './App.css';

function App() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);

  const [level, setLevel] = useState(1);
  const [levelCorrect, setLevelCorrect] = useState(0);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);

  const [collectedFish, setCollectedFish] = useState([]);

  const [levelComplete, setLevelComplete] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [treasureOpened, setTreasureOpened] = useState(false);

  const [screen, setScreen] = useState('home');

  const fishList = [
    { id: 1, emoji: '🐠', name: 'Clownfish', description: 'A colorful ocean fish.' },
    { id: 2, emoji: '🐟', name: 'Blue Fish', description: 'A beautiful little swimmer.' },
    { id: 3, emoji: '🐡', name: 'Pufferfish', description: 'A cute round fish.' },
    { id: 4, emoji: '🦈', name: 'Shark', description: 'A powerful ocean swimmer.' },
    { id: 5, emoji: '🐬', name: 'Dolphin', description: 'A clever sea animal.' },
    { id: 6, emoji: '🐳', name: 'Whale', description: 'A giant ocean friend.' },
    { id: 7, emoji: '🦀', name: 'Crab', description: 'A little sea walker.' },
    { id: 8, emoji: '🦑', name: 'Squid', description: 'A clever sea creature.' },
    { id: 9, emoji: '🐙', name: 'Octopus', description: 'An amazing eight-armed creature.' },
    { id: 10, emoji: '🦞', name: 'Lobster', description: 'A colorful sea creature.' }
  ];

  const levelNames = [
    'Sunny Reef',
    'Coral Garden',
    'Tropical Ocean',
    'Deep Blue Sea',
    'Ocean Kingdom'
  ];

  async function startGame(selectedLevel) {
    if (selectedLevel) {
      setLevel(selectedLevel);
      setLevelCorrect(0);
      setLevelComplete(false);
    }

    setScreen('game');
    setQuestion(null);
    setAnswer('');
    setMessage('');
    setFeedback('');
    setAnswered(false);
    setLoading(true);

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
      return;
    }

    if (answered || !question) {
      return;
    }

    if (Number(answer) === Number(question.fish)) {
      setFeedback('correct');
      setMessage('Correct! You earned a star and 10 coins! ⭐');

      setScore(previous => previous + 1);
      setCoins(previous => previous + 10);
      setAnswered(true);

      const availableFish = fishList.filter(
        fish => !collectedFish.includes(fish.id)
      );

      if (availableFish.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * availableFish.length
        );

        const newFish = availableFish[randomIndex];

        setCollectedFish(previous => [...previous, newFish.id]);

        setMessage(
          'Amazing! You unlocked a ' + newFish.name + '! ' + newFish.emoji
        );
      } else {
        setMessage('Amazing! You already collected all 10 fish! 🐠');
      }

      const newCorrectCount = levelCorrect + 1;
      setLevelCorrect(newCorrectCount);

      if (newCorrectCount === 3) {
        setLevelComplete(true);

        setCompletedLevels(previous => {
          if (previous.includes(level)) {
            return previous;
          }

          return [...previous, level];
        });

        setUnlockedLevel(previous =>
          Math.max(previous, Math.min(level + 1, 5))
        );

        setMessage('Amazing! You completed Level ' + level + '! 🎉');
      }
    } else {
      setFeedback('wrong');
      setMessage('Try again, little explorer!');
    }
  }

  function openTreasure() {
    setTreasureOpened(true);
  }

  function goToLevels() {
    setQuestion(null);
    setAnswer('');
    setMessage('');
    setFeedback('');
    setAnswered(false);
    setLevelComplete(false);
    setScreen('levels');
  }

  function restartGame() {
    setQuestion(null);
    setAnswer('');
    setMessage('');
    setFeedback('');
    setScore(0);
    setCoins(0);
    setLevel(1);
    setLevelCorrect(0);
    setUnlockedLevel(1);
    setCompletedLevels([]);
    setCollectedFish([]);
    setLevelComplete(false);
    setAnswered(false);
    setTreasureOpened(false);
    setScreen('home');
  }

  return (
    <div className="game-container">

      <header className="game-header">
        <h1>🐠 Ocean Adventure</h1>
        <p>Explore the ocean and collect treasures!</p>

        <div className="score">
          ⭐ Stars: {score} | 💎 Coins: {coins}
        </div>
      </header>

      {coins >= 50 && (
        <div className="treasure-panel">
          {treasureOpened ? (
            <>
              <h2>🎉 Treasure Unlocked!</h2>
              <p>You are an amazing ocean explorer!</p>
              <div className="big-treasure">💎 🪙 ⭐</div>
              <p>Congratulations! You found the hidden treasure!</p>
            </>
          ) : (
            <>
              <div className="big-treasure">🧰</div>
              <h2>You unlocked a Treasure Chest!</h2>
              <p>You collected 50 coins. Open your special reward!</p>
              <button onClick={openTreasure}>
                Open Treasure 🎁
              </button>
            </>
          )}
        </div>
      )}

      {/* HOME SCREEN */}

      {screen === 'home' && (
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

          <p className="current-level">
            Your Unlocked Level: {unlockedLevel}
          </p>

          <button onClick={() => setScreen('levels')}>
            Explore Levels 🌊
          </button>

          <button onClick={() => setScreen('aquarium')}>
            🐠 My Aquarium
          </button>

        </main>
      )}

      {/* LEVEL SELECTION */}

      {screen === 'levels' && (
        <main className="levels-card">

          <h2>🌊 Choose Your Adventure</h2>
          <p>Complete each level to unlock the next one!</p>

          <div className="levels-grid">
            {levelNames.map((name, index) => {
              const levelNumber = index + 1;
              const isUnlocked = levelNumber <= unlockedLevel;
              const isCompleted = completedLevels.includes(levelNumber);

              return (
                <button
                  key={levelNumber}
                  className={`level-button ${
                    isUnlocked ? 'unlocked' : 'locked'
                  }`}
                  disabled={!isUnlocked}
                  onClick={() => startGame(levelNumber)}
                >
                  <span className="level-icon">
                    {isCompleted ? '⭐' : isUnlocked ? '🐠' : '🔒'}
                  </span>

                  <strong>Level {levelNumber}</strong>
                  <span>{name}</span>

                  <small>
                    {isCompleted
                      ? 'Completed'
                      : isUnlocked
                      ? 'Play Now'
                      : 'Locked'}
                  </small>
                </button>
              );
            })}
          </div>

          <p className="level-hint">
            ⭐ Complete 3 questions to finish a level.
          </p>

          <button className="home-button" onClick={() => setScreen('home')}>
            🏠 Home
          </button>

        </main>
      )}

      {/* AQUARIUM SCREEN */}

      {screen === 'aquarium' && (
        <main className="aquarium-card">

          <h2>🐠 My Aquarium</h2>
          <p>Discover all the amazing ocean creatures!</p>

          <h3>
            Fish Collection: {collectedFish.length} / 10
          </h3>

          <div className="collection-progress">
            <div
              className="collection-progress-fill"
              style={{
                width: (collectedFish.length / 10) * 100 + '%'
              }}
            ></div>
          </div>

          <div className="fish-catalogue">

            {fishList.map(fish => {
              const isCollected = collectedFish.includes(fish.id);

              return (
                <div
                  key={fish.id}
                  className={`fish-card ${
                    isCollected ? 'fish-unlocked' : 'fish-locked'
                  }`}
                >
                  <div className="catalogue-fish">
                    <span className={isCollected ? '' : 'fish-faded'}>
                      {fish.emoji}
                    </span>

                    {!isCollected && (
                      <span className="fish-lock-badge">🔒</span>
                    )}
                  </div>

                  <h3>
                    {isCollected ? fish.name : 'Mystery Fish'}
                  </h3>

                  <p>
                    {isCollected
                      ? fish.description
                      : 'Play the game to unlock this fish!'}
                  </p>

                  <small>
                    {isCollected ? 'UNLOCKED ⭐' : 'LOCKED'}
                  </small>
                </div>
              );
            })}

          </div>

          {collectedFish.length === 10 && (
            <div className="collection-complete">
              <h2>🏆 Amazing Explorer!</h2>
              <p>You collected all 10 ocean creatures!</p>
              <div>🐠 🐟 🐡 🦈 🐬 🐳 🦀 🦑 🐙 🦞</div>
            </div>
          )}

          <button
            className="home-button"
            onClick={() => setScreen('home')}
          >
            🏠 Back to Home
          </button>

        </main>
      )}

      {/* GAME SCREEN */}

      {screen === 'game' && (
        levelComplete ? (
          <main className="level-complete-card">

            {level === 5 ? (
              <>
                <div className="complete-icon">🏆</div>
                <h2>Congratulations, Champion!</h2>
                <p>You completed all 5 Ocean Adventure levels!</p>
                <p>You are a true Little Ocean Explorer! 🐠</p>

                <button onClick={restartGame}>
                  Play Again 🔄
                </button>
              </>
            ) : (
              <>
                <div className="complete-icon">🎉</div>
                <h2>Level {level} Completed!</h2>
                <p>Great job, Little Explorer!</p>
                <p>You answered 3 questions correctly.</p>

                <button onClick={goToLevels}>
                  Back to Level Map 🗺️
                </button>
              </>
            )}

          </main>
        ) : (
          <main className={`game-card ${feedback}`}>

            <h2>🐟 Level {level} - {levelNames[level - 1]}</h2>

            <div className="game-progress">
              Questions completed: {levelCorrect} / 3

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: (levelCorrect / 3) * 100 + '%' }}
                ></div>
              </div>
            </div>

            {loading ? (
              <h3 className="loading-text">
                Loading Fish Question... 🐠
              </h3>
            ) : question ? (
              <>
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

                <button
                  onClick={checkAnswer}
                  disabled={answered}
                >
                  Submit Answer
                </button>
              </>
            ) : (
              <button onClick={() => startGame()}>
                Try Loading Again
              </button>
            )}

            <p className="message">{message}</p>

            {feedback === 'correct' && (
              <div className="reward-animation">
                ⭐ +10 💰
              </div>
            )}

            {answered && !levelComplete && (
              <button
                className="next-button"
                onClick={() => startGame()}
              >
                Next Question ➜
              </button>
            )}

            <button className="home-button" onClick={goToLevels}>
              🗺️ Level Map
            </button>

          </main>
        )
      )}

      <footer>
        🌊 Keep Exploring • Keep Learning • Have Fun!
      </footer>

    </div>
  );
}

export default App;