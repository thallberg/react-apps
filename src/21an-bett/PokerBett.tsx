import React, { useState } from "react";

const getRandomCard = () => Math.floor(Math.random() * 11) + 1;

const PokerWith21Game = () => {
  const [bankroll, setBankroll] = useState<number | null>(null);
  const [bet, setBet] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const [playerCards, setPlayerCards] = useState<number[]>([]);
  const [dealerCards, setDealerCards] = useState<number[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const getTotal = (cards: number[]) =>
    cards.reduce((acc, val) => acc + val, 0);

  const handleBankrollSelect = (amount: number) => {
    setBankroll(amount);
    resetRound();
    setMessage("");
  };

  const handleBet = (amount: number) => {
    if (!bankroll || amount > bankroll) return;

    setBet(amount);
    setBankroll(bankroll - amount);
    setPlayerCards([getRandomCard(), getRandomCard()]);
    setDealerCards([getRandomCard()]);
    setIsPlayerTurn(true);
    setResult("");
    setMessage(`Du satsade ${amount} kr.`);
  };

  const handleDraw = () => {
    const card = getRandomCard();
    const newCards = [...playerCards, card];
    setPlayerCards(newCards);

    if (getTotal(newCards) > 21) {
      endGame("lose");
    }
  };

  const handleStay = () => {
    setIsPlayerTurn(false);

    const newDealerCards = [...dealerCards];
    while (getTotal(newDealerCards) < 17) {
      newDealerCards.push(getRandomCard());
    }
    setDealerCards(newDealerCards);

    const playerTotal = getTotal(playerCards);
    const dealerTotal = getTotal(newDealerCards);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      endGame("win");
    } else if (dealerTotal === playerTotal) {
      endGame("draw");
    } else {
      endGame("lose");
    }
  };

  const endGame = (outcome: "win" | "lose" | "draw") => {
    let newMessage = "";
    let newBankroll = bankroll ?? 0;

    switch (outcome) {
      case "win":
        newMessage = "Du vann! 🎉 Du fick tillbaka dubbel insats.";
        newBankroll += bet * 2;
        break;
      case "draw":
        newMessage = "Oavgjort 🤝 Du fick tillbaka din insats.";
        newBankroll += bet;
        break;
      case "lose":
        newMessage = "Du förlorade! 😞";
        break;
    }

    setBankroll(newBankroll);
    setResult(newMessage);
    setIsPlayerTurn(false);
  };

  const resetGame = () => {
    setBankroll(null);
    setBet(0);
    setMessage("");
    resetRound();
  };

  const resetRound = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setIsPlayerTurn(false);
    setResult("");
    setBet(0); // Gör att man måste välja insats på nytt
    setMessage("");
  };

  return (
    <section className="p-4 max-w-md mx-auto bg-green-100 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">🃏 Blackjack 21 med Betting</h1>

      {!bankroll ? (
        <>
          <p className="mb-2 font-semibold">Välj din bankrulle:</p>
          <div className="space-x-2">
            {[100, 500, 1000].map((amount) => (
              <button
                key={amount}
                onClick={() => handleBankrollSelect(amount)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {amount} kr
              </button>
            ))}
          </div>
        </>
      ) : !bet && !isPlayerTurn ? (
        <>
          <p className="mb-2">
            💵 Bankrulle: <strong>{bankroll} kr</strong>
          </p>
          <p className="mb-2 font-semibold">Välj din insats:</p>
          <div className="space-x-2 flex justify-center">
            {[5, 10, 20].map((amount) => (
              <button
                key={amount}
                onClick={() => handleBet(amount)}
                disabled={bankroll < amount}
                className="bg-green-500 text-white px-4 py-2"
              >
                {amount} 💵
              </button>
            ))}
          </div>
          {message && <p className="font-semibold mt-4">{message}</p>}
        </>
      ) : (
        <>
          <p>
            💵 Bankrulle: <strong>{bankroll} kr</strong>
          </p>
          <p>
            🎯 Din insats: <strong>{bet} kr</strong>
          </p>
          <p className="mt-2">
            <strong>Dina kort:</strong> {playerCards.join(", ")} (
            {getTotal(playerCards)})
          </p>
          {!isPlayerTurn && dealerCards.length > 0 && (
            <p>
              <strong>Dealerns kort:</strong> {dealerCards.join(", ")} (
              {getTotal(dealerCards)})
            </p>
          )}

          {result ? (
            <>
              <p className="text-xl font-bold my-4">{result}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={resetRound}
              >
                Ny runda
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={resetGame}
              >
                Starta om helt
              </button>
            </>
          ) : (
            <>
              <div className="mt-4 space-x-2">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
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
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default PokerWith21Game;
