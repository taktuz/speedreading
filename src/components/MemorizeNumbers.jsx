import React, { useEffect, useState } from "react";
import "./MemorizeNumbers.css";

const MemorizeNumbers = () => {
  const [countdown, setCountdown] = useState(3);

  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [showNumbers, setShowNumbers] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const newSeq = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10)
    );
    setSequence(newSeq);
    setUserInput(Array(4).fill(""));
    setCurrentIndex(0);
    setShowNumbers(true);
    setIsChecking(false);

    setTimeout(() => setShowNumbers(false), 300);
  };

  const handleDigitClick = (digit) => {
    if (isChecking || currentIndex >= 4) return;

    const newInput = [...userInput];
    newInput[currentIndex] = digit;
    setUserInput(newInput);

    const nextIndex = currentIndex + 1;
    if (nextIndex === 4) {
      setTimeout(() => setIsChecking(true), 200);
    }
    setCurrentIndex(nextIndex);
  };

  const handleBackspace = () => {
    if (isChecking || currentIndex === 0) return;
    const prevIndex = currentIndex - 1;
    const newInput = [...userInput];
    newInput[prevIndex] = "";
    setUserInput(newInput);
    setCurrentIndex(prevIndex);
  };

  const getBoxColor = (index) => {
    if (!isChecking) return "box";
    return userInput[index] === sequence[index].toString()
      ? "box correct"
      : "box wrong";
  };

  return (
    <div className="mn-container">
      <h2 className="mn-title">Remember numbers</h2>

      <div className="mn-boxes">
        {sequence.map((num, idx) => (
          <div key={idx} className={getBoxColor(idx)}>
            {showNumbers ? num : userInput[idx] || "_"}
          </div>
        ))}
      </div>

      {isChecking && (
        <button className="mn-check" onClick={startNewRound}>
          Next
        </button>
      )}

      {!isChecking && (
        <div className="mn-numpad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
            <button
              key={n}
              className="mn-btn"
              onClick={() => handleDigitClick(n.toString())}
            >
              {n}
            </button>
          ))}
          <button className="mn-btn wide" onClick={handleBackspace}>
            ⌫
          </button>
        </div>
      )}
    </div>
  );
};

export default MemorizeNumbers;
