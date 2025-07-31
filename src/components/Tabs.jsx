// Tabs.jsx
import styles from "./Tabs.module.css";

export default function Tabs({ setScreen }) {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.row}>
        <div className={styles.tab} onClick={() => setScreen("practice")}>
          🧠 Practice
        </div>
        <div className={styles.tab} onClick={() => setScreen("games")}>
          🎮 Games
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.tab} onClick={() => setScreen("library")}>
          📚 Library
        </div>
      </div>
    </div>
  );
}
