import { useEffect, useState } from "react";
import styles from "./LineSweep.module.css";

export default function LineSweep({ selectedBook }) {
  const books = {
    "Sherlock Holmes 1": "/books/sherlock.txt",
    "Sherlock Holmes 2": "/books/sherlock2.txt",
  };

  const PAGE_SIZE = 200;
  const WINDOW_SIZE = 25;
  const INTERVAL_MS = 500;

  const [pages, setPages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [highlightStart, setHighlightStart] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const loadText = async () => {
      const res = await fetch(books[selectedBook]);
      const text = await res.text();
      const clean = text.replace(/\s+/g, " ").trim();
      const words = clean.split(" ");

      const paginated = [];
      for (let i = 0; i < words.length; i += PAGE_SIZE) {
        paginated.push(words.slice(i, i + PAGE_SIZE));
      }

      setPages(paginated);
      setPageIndex(0);
      setHighlightStart(0);
      setPlaying(false);
    };

    loadText();
  }, [selectedBook]);

  useEffect(() => {
    if (!playing || pages.length === 0) return;

    const interval = setInterval(() => {
      setHighlightStart((prev) => {
        const currentPage = pages[pageIndex];

        if (prev + WINDOW_SIZE >= currentPage.length) {
          // Move to next page
          if (pageIndex + 1 < pages.length) {
            setPageIndex((pi) => pi + 1);
            return 0;
          } else {
            // End of book
            setPlaying(false);
            return prev;
          }
        }

        return prev + WINDOW_SIZE;
      });
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [playing, pages, pageIndex]);

  const renderWords = () => {
    if (!pages[pageIndex]) return null;

    return pages[pageIndex].map((word, i) => {
      const inWindow = i >= highlightStart && i < highlightStart + WINDOW_SIZE;
      return (
        <span key={i} className={inWindow ? styles.highlighted : styles.muted}>
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.page}>{renderWords()}</div>

      <div className={styles.controls}>
        <button onClick={() => setPlaying(!playing)}>
          {playing ? "⏸ Pause" : "▶️ Start"}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setPageIndex(0);
            setHighlightStart(0);
          }}
        >
          🔁 Restart
        </button>
      </div>
    </div>
  );
}
