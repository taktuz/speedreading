import { useNavigate } from "react-router-dom";
import "./Games.css";

export default function Games({ setScreen, setGameMode }) {
  const navigate = useNavigate();

  return (
    <div className="games-container">
      <h2>🕹️ Games</h2>
      <div className="games-buttons">
        <button onClick={() => setGameMode("MemorizeNumbers")}>
          Memorize Numbers
        </button>

        <button onClick={() => navigate("/games/shulte-table")}>
          Shulte Table
        </button>
        <button onClick={() => navigate("/games/pairs-of-words")}>
          Pairs of Words
        </button>
        <button onClick={() => navigate("/games/line-of-sight")}>
          Line of Sight
        </button>
      </div>
    </div>
  );
}
