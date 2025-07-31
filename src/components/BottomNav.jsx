import "./BottomNav.css";
import { FaHome, FaGamepad, FaBook } from "react-icons/fa";

export default function BottomNav({ setScreen }) {
  return (
    <div className="bottom-nav">
      <button onClick={() => setScreen("home")}>
        <FaHome />
        <span>Home</span>
      </button>
      <button onClick={() => setScreen("games")}>
        <FaGamepad />
        <span>Games</span>
      </button>
      <button onClick={() => setScreen("library")}>
        <FaBook />
        <span>Library</span>
      </button>
    </div>
  );
}
