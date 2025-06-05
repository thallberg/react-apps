import React, { useState } from 'react';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function getRandomCard() {
  return cards[Math.floor(Math.random() * cards.length)];
}

const HighestWinner = () => {
  const [currentCard, setCurrentCard] = useState(getRandomCard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const [lastDrawnCard, setLastDrawnCard] = useState<number | null>(null);
  const [lastGuess, setLastGuess] = useState<'higher' | 'lower' | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);

  function handleGuess(guess: 'higher' | 'lower') {
    if (gameOver) return;

    const nextCard = getRandomCard();
    setLastDrawnCard(nextCard);
    setLastGuess(guess);

    const isCorrect =
      (guess === 'higher' && nextCard > currentCard) ||
      (guess === 'lower' && nextCard < currentCard);

    setWasCorrect(isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setGameOver(true);
      setLastScore(score);
      setScore(0);
    }

    setCurrentCard(nextCard);
  }

  function handleRestart() {
    setScore(0);
    setGameOver(false);
    setCurrentCard(getRandomCard());
    setLastDrawnCard(null);
    setLastGuess(null);
    setWasCorrect(null);
  }

  return (
    <div className="p-4 text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">High or Low</h2>

      <div className="text-5xl mb-4">🃏 {currentCard}</div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleGuess('higher')}
          disabled={gameOver}
        >
          Högre
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleGuess('lower')}
          disabled={gameOver}
        >
          Lägre
        </button>
      </div>

      {lastDrawnCard !== null && lastGuess && (
        <div className="mb-4 text-lg">
          Du gissade: <strong>{lastGuess === 'higher' ? 'Högre' : 'Lägre'}</strong><br />
          Kortet var: <strong>{lastDrawnCard}</strong><br />
          {wasCorrect ? (
            <span className="text-green-600 font-semibold">Rätt! 🎉</span>
          ) : (
            <span className="text-red-600 font-semibold">Fel! 😢</span>
          )}
        </div>
      )}

      <div className="text-lg font-medium mb-2">Poäng: {score}</div>

      {gameOver && (
        <div className="text-red-600 font-semibold">
          Game Over! Du fick {lastScore} poäng.
          <div className="mt-2">
            <button
              onClick={handleRestart}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighestWinner;
