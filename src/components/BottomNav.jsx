import { FaHome, FaUser, FaChartBar, FaCog } from "react-icons/fa";
import styles from "./BottomNav.module.css";

export default function BottomNav({ setScreen }) {
  return (
    <div className={styles.bottomNav}>
      <button onClick={() => setScreen("home")}>
        <FaHome />
      </button>
      <button onClick={() => setScreen("practice")}>
        <FaUser />
      </button>
      <button onClick={() => setScreen("stats")}>
        <FaChartBar />
      </button>
      <button onClick={() => setScreen("settings")}>
        <FaCog />
      </button>
    </div>
  );
}
