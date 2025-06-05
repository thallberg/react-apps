import React, { useEffect, useState } from "react";

const emojis = ["🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐼", "🐸"];

type CardType = {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Memory = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [mode, setMode] = useState<"solo" | "twoPlayers" | null>(null);
  const [players, setPlayers] = useState<{ name: string; score: number }[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [nameInput1, setNameInput1] = useState("");
  const [nameInput2, setNameInput2] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const initializeGame = () => {
    const duplicated = [...emojis, ...emojis];
    const shuffled = shuffleArray(
      duplicated.map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }))
    );
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCount(0);
  };

  useEffect(() => {
    if (mode) initializeGame();
  }, [mode]);

  const handleFlip = (index: number) => {
    if (
      isProcessing ||
      cards[index].flipped ||
      cards[index].matched ||
      flippedCards.length === 2
    ) {
      return;
    }

    const updated = [...cards];
    updated[index].flipped = true;
    const newFlipped = [...flippedCards, index];
    setCards(updated);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [firstIdx, secondIdx] = newFlipped;

      if (updated[firstIdx].emoji === updated[secondIdx].emoji) {
        // Match hittad
        updated[firstIdx].matched = true;
        updated[secondIdx].matched = true;
        setMatchedCount((prev) => prev + 1);
        setPlayers((prev) =>
          prev.map((p, i) =>
            i === currentPlayerIndex ? { ...p, score: p.score + 1 } : p
          )
        );

        setTimeout(() => {
          setCards([...updated]);
          setFlippedCards([]);
          setIsProcessing(false);
        }, 800);
      } else {
        // Ingen match - växla spelare
        setTimeout(() => {
          updated[firstIdx].flipped = false;
          updated[secondIdx].flipped = false;
          setCards([...updated]);
          setFlippedCards([]);
          setIsProcessing(false);
          const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
          setCurrentPlayerIndex(nextPlayerIndex);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    initializeGame();
    setCurrentPlayerIndex(0);
    setPlayers((prev) => prev.map((p) => ({ ...p, score: 0 })));
  };

  if (!mode) {
    return (
      <div className="max-w-md mx-auto p-4 text-center space-y-4">
        <h2 className="text-2xl font-bold mb-2">Välj spelläge</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setPlayers([{ name: nameInput1 || "Spelare", score: 0 }]);
            setMode("solo");
          }}
        >
          Spela ensam
        </button>
        <div>
          <input
            type="text"
            placeholder="Ditt namn"
            value={nameInput1}
            onChange={(e) => setNameInput1(e.target.value)}
            className="mt-2 border px-2 py-1 rounded w-full"
          />
        </div>

        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setPlayers([
              { name: nameInput1 || "Spelare 1", score: 0 },
              { name: nameInput2 || "Spelare 2", score: 0 },
            ]);
            setMode("twoPlayers");
          }}
        >
          2 Spelare
        </button>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Spelare 1"
            value={nameInput1}
            onChange={(e) => setNameInput1(e.target.value)}
            className="mt-2 border px-2 py-1 rounded w-full"
          />
          <input
            type="text"
            placeholder="Spelare 2"
            value={nameInput2}
            onChange={(e) => setNameInput2(e.target.value)}
            className="mt-2 border px-2 py-1 rounded w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center p-4">
      <h2 className="text-2xl font-bold mb-4">🐾 Memory Game</h2>

      <p className="mb-2 text-lg font-semibold">
        Nuvarande tur: {players[currentPlayerIndex]?.name}
      </p>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() =>
              !isProcessing ? handleFlip(index) : null
            }
            className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-2xl md:text-3xl cursor-pointer border rounded-lg 
              ${card.flipped || card.matched ? "bg-white" : "bg-blue-300"}
              ${card.matched ? "opacity-50" : ""}`}
          >
            {card.flipped || card.matched ? card.emoji : "❓"}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-lg">Par hittade: {matchedCount} / 8</p>

        <div className="mt-4">
          {players.map((p, i) => (
            <div key={i} className={`text-sm ${i === currentPlayerIndex ? "font-bold text-blue-600" : ""}`}>
              {p.name}: {p.score} poäng
            </div>
          ))}
        </div>

        {matchedCount === 8 && (
          <div className="mt-4 text-green-600 font-semibold">
            🎉 Spelet är klart!
            <div className="mt-2">
              Vinnare: {players.reduce((winner, player) => 
                player.score > winner.score ? player : winner
              ).name} med {Math.max(...players.map(p => p.score))} poäng!
            </div>
          </div>
        )}

        <button
          onClick={resetGame}
          className="mt-4 bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Starta om
        </button>
      </div>
    </div>
  );
};

export default Memory;
