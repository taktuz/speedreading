import FlashingWords from "./FlashingWords";
import LineSweep from "./LineSweep";
import styles from "./Practice.module.css"; // If you have any styles

export default function Practice({
  setPracticeMode,
  practiceMode,
  selectedBook,
}) {
  const modes = [
    { name: "FlashingWords", label: "Flashing Words", color: "#22c55e" }, // green
    { name: "BionicReading", label: "Bionic Reading", color: "#3b82f6" }, // blue
    { name: "EyeTrainer", label: "Eye Movement Trainer", color: "#ef4444" }, // red
    { name: "Chunking", label: "Word Chunking", color: "#eab308" }, // yellow
    { name: "LineSweep", label: "Line Sweep", color: "#f97316" }, // orange
  ];

  // If no mode selected, show the menu
  if (!practiceMode) {
    return (
      <div className="flex flex-col gap-4 mt-6">
        {modes.map((mode) => (
          <button
            key={mode.name}
            onClick={() => setPracticeMode(mode.name)}
            style={{
              backgroundColor: mode.color,
              color: "#fff",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "500",
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              transition: "transform 0.1s ease-in-out",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.97)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {mode.label}
            <span style={{ fontSize: "20px" }}>➡️</span>
          </button>
        ))}
      </div>
    );
  }

  // Render selected mode
  switch (practiceMode) {
    case "FlashingWords":
      return <FlashingWords selectedBook={selectedBook} />;
    case "LineSweep":
      return <LineSweep selectedBook={selectedBook} />;
    case "BionicReading":
    case "EyeTrainer":
    case "Chunking":
      return (
        <div
          style={{ textAlign: "center", marginTop: "80px", fontSize: "18px" }}
        >
          🚧 This mode is under construction 🚧
        </div>
      );
    default:
      return null;
  }
}
