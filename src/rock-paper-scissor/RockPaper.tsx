import { useState } from "react";

const RockPaper = () => {
  const [player, setPlayer] = useState<string>("");
  const [computer, setComputer] = useState<string>("");
  const [isWinner, setIsWinner] = useState<string>("");

  const alternativ: string[] = ["rock", "paper", "scissor"];

  const handleComputerChoise = () => {
    const randomChoise = Math.floor(Math.random() * alternativ.length);
    setComputer(alternativ[randomChoise]);
  };

  const HandleResult = () => {
    if (player === computer) {
      setIsWinner("its a tie");
    } else if (
      (player === "rock" && computer === "scissor") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissor" && computer === "paper")
    ) {
      setIsWinner("You win !");
    } else {
      setIsWinner("Computer wins !");
    }
  };

  const handlePlayerChoice = (choice: string) => {
    setPlayer(choice);
    handleComputerChoise();
    HandleResult();
  };

  return (
    <section className="flex flex-col items-center bg-cyan-200 w-full h-lvh py-28">

      <div className="grid grid-cols-3 gap-4 place-items-center">
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded-2xl"
          onClick={() => handlePlayerChoice("rock")}
        >
          Rock
        </button>
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded-2xl"
          onClick={() => handlePlayerChoice("paper")}
        >
          Paper
        </button>
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded-2xl"
          onClick={() => handlePlayerChoice("scissor")}
        >
          Scissor
        </button>
      </div>

      <div className="grid grid-cols-2 gap-1 py-8 w-75">
        <div className="flex flex-col">
          <p className="bg-amber-100 self-center p-2 rounded-2xl">
            Player Choose
          </p>
          <p className="self-center">{player}</p>
        </div>
        <div className="flex flex-col">
          <p className="bg-amber-100 self-center p-2 rounded-2xl">
            Computer Choose
          </p>
          <p className="self-center">{computer}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="self-center p-2 rounded-2xl">{isWinner}</p>
      </div>
    </section>
  );
};

export default RockPaper;
