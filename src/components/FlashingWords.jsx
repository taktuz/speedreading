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

  return (
    <div className={styles.wrapper}>
      <div className={styles.wordBox}>{words[index]}</div>

      <div className={styles.buttonRow}>
        <button
          onClick={() => setPlaying(!playing)}
          className={`${styles.button} ${playing ? styles.pause : styles.play}`}
        >
          {playing ? "⏸ Pause" : "▶️ Start"}
        </button>

        <button
          onClick={() => {
            setIndex(0);
            setPlaying(false);
          }}
          className={styles.restart}
        >
          🔁 Restart
        </button>
      </div>

      <div className={styles.wpmControl}>
        <button
          onClick={() => setWpm((prev) => Math.max(50, prev - 50))}
          disabled={wpm <= 50}
          className={styles.controlButton}
        >
          ⏪
        </button>

        <span className={styles.wpmLabel}>{wpm} WPM</span>

        <button
          onClick={() => setWpm((prev) => Math.min(1000, prev + 50))}
          disabled={wpm >= 1000}
          className={styles.controlButton}
        >
          ⏩
        </button>
      </div>
    </div>
  );
}
