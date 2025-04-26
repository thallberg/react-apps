import React, { useEffect, useState } from "react";

const GAME_HEIGHT = 500;
const GAME_WIDTH = 1000;
const GRAVITY = 4;
const JUMP_HEIGHT = 100;
const OBSTACLE_WIDTH = 50;
const OBSTACLE_GAP = 200;

const BirdGame = () => {
  const [birdPosition, setBirdPosition] = useState(GAME_HEIGHT / 2);
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH);
  const [obstacleHeight, setObstacleHeight] = useState(200);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Fågelns rörelse (gravitation)
  useEffect(() => {
    let interval: number | undefined;
    if (gameHasStarted && !isGameOver && birdPosition < GAME_HEIGHT) {
      interval = setInterval(() => {
        setBirdPosition(prev => prev + GRAVITY);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [gameHasStarted, birdPosition, isGameOver]);

  // Hinder-rörelse
  useEffect(() => {
    let obstacleInterval: number | undefined;
    if (gameHasStarted && !isGameOver) {
      obstacleInterval = setInterval(() => {
        setObstacleLeft(prev => {
          if (prev < -OBSTACLE_WIDTH) {
            // När hindret är förbi skärmen
            setObstacleHeight(Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP)));
            setScore(prevScore => prevScore + 1);
            return GAME_WIDTH;
          } else {
            return prev - 5;
          }
        });
      }, 30);
    }
    return () => clearInterval(obstacleInterval);
  }, [gameHasStarted, isGameOver]);

  // Hoppa med mellanslag
  useEffect(() => {
    const handleKeyDown = (e: { code: string; }) => {
      if (e.code === "Space") {
        if (!gameHasStarted) setGameHasStarted(true);
        if (!isGameOver) setBirdPosition(prev => Math.max(prev - JUMP_HEIGHT, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameOver, gameHasStarted]);

  // Kollision
  useEffect(() => {
    const birdTop = birdPosition;
    const birdBottom = birdPosition + 30;
    const obstacleRight = obstacleLeft + OBSTACLE_WIDTH;
    const obstacleTopHeight = obstacleHeight;
    const obstacleBottomTop = obstacleHeight + OBSTACLE_GAP;

    const birdHitsObstacle =
      obstacleLeft <= 130 && obstacleRight >= 100 && // fågelns X-position
      (birdTop <= obstacleTopHeight || birdBottom >= obstacleBottomTop);

    const birdOutOfBounds = birdBottom >= GAME_HEIGHT;

    if (birdHitsObstacle || birdOutOfBounds) {
      setIsGameOver(true);
      setGameHasStarted(false);
    }
  }, [birdPosition, obstacleLeft, obstacleHeight]);

  return (
    <section
      className="relative bg-sky-200 overflow-hidden mx-auto"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
    >
      {/* Poäng */}
      <div className="absolute text-2xl font-bold top-2 left-4 z-10">{score}</div>

      {/* Fågel */}
      <div
        className="absolute w-8 h-8 bg-yellow-400 rounded-full"
        style={{ top: birdPosition, left: 100 }}
      />

      {/* Övre hinder */}
      <div
        className="absolute bg-green-600"
        style={{
          height: obstacleHeight,
          width: OBSTACLE_WIDTH,
          left: obstacleLeft,
          top: 0,
        }}
      />

      {/* Undre hinder */}
      <div
        className="absolute bg-green-600"
        style={{
          height: GAME_HEIGHT - (obstacleHeight + OBSTACLE_GAP),
          width: OBSTACLE_WIDTH,
          left: obstacleLeft,
          top: obstacleHeight + OBSTACLE_GAP,
        }}
      />

      {/* Game Over-text */}
      {isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold">
          Game Over
        </div>
      )}
    </section>
  );
};

export default BirdGame;
