import { useState, useEffect } from "react";
import styles from "./App.module.css";

import Tabs from "./components/Tabs";
import Chart from "./components/Chart";
import Practice from "./components/Practice";
import FlashingWords from "./components/FlashingWords";
import BionicReading from "./components/BionicReading";
import LineSweep from "./components/LineSweep";
import Games from "./components/Games";
import Library from "./components/Library";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [practiceMode, setPracticeMode] = useState(null);
  const [selectedBook, setSelectedBook] = useState("Sherlock Holmes 1");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const isPracticeDetail = screen === "practice" && practiceMode !== null;

  return (
    <div className={`${styles.app} ${darkMode ? styles.dark : ""}`}>
      {/* Header */}
      <div className={styles.appbar}>
        {screen === "home" ? (
          <h1 className={styles.title}>Speed Reader 🧠</h1>
        ) : isPracticeDetail ? (
          <button
            onClick={() => setPracticeMode(null)}
            className={styles.backButton}
          >
            ←
          </button>
        ) : (
          <button
            onClick={() => setScreen("home")}
            className={styles.backButton}
          >
            ←
          </button>
        )}

        {screen === "practice" && practiceMode !== null && (
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className={styles.bookSelector}
          >
            <option>Sherlock Holmes 1</option>
            <option>Sherlock Holmes 2</option>
          </select>
        )}

        {screen === "home" && (
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={styles.toggleButton}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        )}
      </div>

      {/* Content */}
      {screen === "home" && (
        <>
          <Tabs setScreen={setScreen} />
          <div className={styles.chartContainer}>
            <Chart />
          </div>
        </>
      )}

      {screen === "practice" && (
        <div className={styles.practiceContainer}>
          {practiceMode === null && (
            <Practice setPracticeMode={setPracticeMode} />
          )}
          {practiceMode === "FlashingWords" && (
            <FlashingWords selectedBook={selectedBook} />
          )}
          {practiceMode === "BionicReading" && (
            <BionicReading selectedBook={selectedBook} />
          )}
          {practiceMode === "LineSweep" && (
            <LineSweep selectedBook={selectedBook} />
          )}
        </div>
      )}

      {screen === "games" && (
        <div className={styles.practiceContainer}>
          <Games setScreen={setScreen} />
        </div>
      )}

      {screen === "library" && (
        <div className={styles.practiceContainer}>
          <Library setScreen={setScreen} />
        </div>
      )}
    </div>
  );
}
