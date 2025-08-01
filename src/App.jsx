import { useState, useEffect } from "react";
import styles from "./App.module.css";

import Tabs from "./components/Tabs";
import Chart from "./components/Chart";
import Practice from "./components/Practice";
import FlashingWords from "./components/FlashingWords";
import BionicReading from "./components/BionicReading";
import Games from "./components/Games";
import Library from "./components/Library";
import MirrorReading from "./components/MirrorReading";
import MarginReading from "./components/MarginReading";
import MemorizeNumbers from "./components/MemorizeNumbers";

import BottomNav from "./components/BottomNav";
import { FaArrowLeft } from "react-icons/fa";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [practiceMode, setPracticeMode] = useState(null);
  const [selectedBook, setSelectedBook] = useState("Sherlock Holmes 1");
  const [darkMode, setDarkMode] = useState(true);
  const [gameMode, setGameMode] = useState(null); // NEW

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const isPracticeDetail = screen === "practice" && practiceMode !== null;

  const showAppbar = !(
    (screen === "practice" && practiceMode === "MarginReading") ||
    (screen === "games" && gameMode === "MemorizeNumbers")
  );

  const showBottomNav = !(
    (screen === "practice" && practiceMode === "MarginReading") ||
    (screen === "games" && gameMode === "MemorizeNumbers")
  );

  return (
    <div className={`${styles.app} ${darkMode ? styles.dark : ""}`}>
      {/* Header */}
      {showAppbar && (
        <div className={styles.appbar}>
          {screen === "home" ? (
            <h1 className={styles.title}>TAKT</h1>
          ) : isPracticeDetail ? (
            <button
              onClick={() => setPracticeMode(null)}
              className={styles.backButton}
            >
              ←
            </button>
          ) : screen === "games" && gameMode !== null ? (
            <button
              onClick={() => setGameMode(null)}
              className={styles.backButton}
            >
              <FaArrowLeft />
            </button>
          ) : (
            <button
              onClick={() => setScreen("home")}
              className={styles.backButton}
            >
              <FaArrowLeft />
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
      )}

      {/* Home Screen */}
      {screen === "home" && (
        <>
          <Tabs setScreen={setScreen} />
          <div className={styles.homeContent}>
            <div className={styles.chartContainer}>
              <Chart />
            </div>

            <div className={styles.streakContainer}>
              <div className={styles.streakRow}>
                <div className={styles.streakColumn}>
                  <div className={styles.streakLabel}>🔥 Best Streak:</div>
                  <div className={styles.streakValue}>7 days</div>
                </div>
                <div className={styles.streakColumn}>
                  <div className={styles.streakLabel}>⚡ Current Streak:</div>
                  <div className={styles.streakValue}>3 days</div>
                </div>
              </div>

              <button className={styles.startButton}>START</button>
            </div>
          </div>
        </>
      )}

      {/* Practice Modes */}
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
          {practiceMode === "MarginReading" && (
            <MarginReading selectedBook={selectedBook} />
          )}
          {practiceMode === "MirrorReading" && (
            <MirrorReading selectedBook={selectedBook} />
          )}
        </div>
      )}

      {/* Games */}
      {screen === "games" && (
        <div className={styles.practiceContainer}>
          {gameMode === null && (
            <Games setScreen={setScreen} setGameMode={setGameMode} />
          )}
          {gameMode === "MemorizeNumbers" && <MemorizeNumbers />}
        </div>
      )}

      {/* Library */}
      {screen === "library" && (
        <div className={styles.practiceContainer}>
          <Library setScreen={setScreen} />
        </div>
      )}

      {showBottomNav && <BottomNav setScreen={setScreen} />}
    </div>
  );
}
