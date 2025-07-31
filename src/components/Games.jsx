import "./Games.css";

export default function Games({ setScreen }) {
  return (
    <div className="games-container">
      <h2 className="games-title">Mini Games 🎯</h2>

      <p className="games-description">
        🚧 Game zone is under construction. We’ll bring fun and focus together!
      </p>

      <button className="back-home-button" onClick={() => setScreen("home")}>
        ← Back to Home
      </button>
    </div>
  );
}
