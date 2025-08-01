import { useEffect, useState } from "react";
import "./ShulteTable.css";

export default function ShulteTable() {
  const [grid, setGrid] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    setGrid(shuffled);
    setCurrentNumber(1);
    setStartTime(Date.now());
    setElapsedTime(0);
    setFinished(false);
  }, []);

  useEffect(() => {
    let interval;
    if (!finished) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [startTime, finished]);

  const handleClick = (number) => {
    if (number === currentNumber) {
      if (number === 25) {
        setFinished(true);
      }
      setCurrentNumber((prev) => prev + 1);
    }
  };

  return (
    <div className="shulte-container">
      <h2>Find number: {currentNumber}</h2>
      <div className="shulte-timer">
        Time: {(elapsedTime / 1000).toFixed(1)} sec
      </div>
      <div className="shulte-grid">
        {grid.map((num, i) => (
          <button
            key={i}
            onClick={() => handleClick(num)}
            className={`shulte-cell ${num < currentNumber ? "clicked" : ""}`}
          >
            {num}
          </button>
        ))}
      </div>
      {finished && (
        <div className="shulte-result">
          🎉 Finished in {(elapsedTime / 1000).toFixed(1)} seconds!
        </div>
      )}
    </div>
  );
}
