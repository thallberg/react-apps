import { useState } from 'react';

const getRandomCard = () => Math.floor(Math.random() * 11) + 1;

const PokerGame = () => {
  const [playerCards, setPlayerCards] = useState<number[]>([]);
  const [dealerCards, setDealerCards] = useState<number[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [result, setResult] = useState("");

  const getTotal = (cards: number[]) => cards.reduce((acc, val) => acc + val, 0);

  const handleDraw = () => {
    const card = getRandomCard();
    const newCards = [...playerCards, card];
    setPlayerCards(newCards);

    const total = getTotal(newCards);
    if (total > 21) {
      setResult("Du förlorade! 🫣");
      setIsPlayerTurn(false);
    }
  };

  const handleStay = () => {
    setIsPlayerTurn(false);

    let newDealerCards = [...dealerCards];
    while (getTotal(newDealerCards) < 17) {
      newDealerCards.push(getRandomCard());
    }
    setDealerCards(newDealerCards);

    const playerTotal = getTotal(playerCards);
    const dealerTotal = getTotal(newDealerCards);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setResult("Du vann! 🎉");
    } else if (dealerTotal === playerTotal) {
      setResult("Oavgjort 🤝");
    } else {
      setResult("Du förlorade! 😞");
    }
  };

  const handleRestart = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setIsPlayerTurn(true);
    setResult("");
  };

  return (
    <section className="p-4 max-w-md mx-auto bg-green-100 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">🃏 Blackjack 21</h1>

      <div className="mb-2">
        <p><strong>Dina kort:</strong> {playerCards.join(", ")} ({getTotal(playerCards)})</p>
        {!isPlayerTurn && (
          <p><strong>Dealerns kort:</strong> {dealerCards.join(", ")} ({getTotal(dealerCards)})</p>
        )}
      </div>

      {result ? (
        <>
          <p className="text-xl font-bold my-4">{result}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRestart}>
            Spela igen
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
            onClick={handleDraw}
            disabled={!isPlayerTurn}
          >
            Dra kort
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={handleStay}
            disabled={!isPlayerTurn}
          >
            Stanna
          </button>
        </>
      )}
    </section>
  );
};

export default PokerGame;
