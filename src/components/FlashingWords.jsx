import { useEffect, useState } from "react";
import styles from "./FlashingWords.module.css";

export default function FlashingWords({ selectedBook }) {
  const books = {
    "Sherlock Holmes 1": "/books/sherlock.txt",
    "Sherlock Holmes 2": "/books/sherlock2.txt",
  };

  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wpm, setWpm] = useState(300);
  const [flashTrigger, setFlashTrigger] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      const res = await fetch(books[selectedBook]);
      const text = await res.text();
      const clean = text.replace(/\s+/g, " ").trim();
      setWords(clean.split(" "));
      setIndex(0);
      setPlaying(false);
    };

    loadBook();
  }, [selectedBook]);

  useEffect(() => {
    if (!playing || words.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev + 1 < words.length) return prev + 1;
        setPlaying(false);
        return prev;
      });
    }, 60000 / wpm);

    return () => clearInterval(interval);
  }, [playing, wpm, words]);

  const handleStartToggle = () => {
    setPlaying((prev) => !prev);
    setFlashTrigger(false);
  };

  const handleRestart = () => {
    setIndex(0);
    setPlaying(false);
    setFlashTrigger(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wordBox}>
        <span>{words[index]}</span>
      </div>

      <div className={styles.controls}>
        <button
          onClick={handleStartToggle}
          className={`${styles.btn} ${
            playing ? styles.btnMuted : flashTrigger ? styles.btnFlash : ""
          }`}
        >
          {playing ? "⏸ Pause" : "▶️ Start"}
        </button>

        <button onClick={handleRestart} className={styles.btnMuted}>
          🔁 Restart
        </button>
      </div>

      <div className={styles.speed}>
        <button
          onClick={() => setWpm((prev) => Math.max(50, prev - 50))}
          className={styles.speedBtn}
        >
          ⏪
        </button>
        <span className={styles.wpmText}>{wpm} WPM</span>
        <button
          onClick={() => setWpm((prev) => Math.min(1000, prev + 50))}
          className={styles.speedBtn}
        >
          ⏩
        </button>
      </div>
    </div>
  );
}
