import FlashingWords from "./FlashingWords";
import MarginReading from "./MarginReading";
import MirrorReading from "./MirrorReading";

import styles from "./Practice.module.css";

export default function Practice({
  setPracticeMode,
  practiceMode,
  selectedBook,
}) {
  const modes = [
    { name: "FlashingWords", label: "Flashing Words" },
    { name: "BionicReading", label: "Bionic Reading" },
    { name: "MarginReading", label: "Margin Reading" },
    { name: "MirrorReading", label: "Mirror Reading" },
  ];

  if (!practiceMode) {
    return (
      <div className={styles.modeList}>
        {modes.map((mode) => (
          <button
            key={mode.name}
            onClick={() => {
              console.log("Mode selected:", mode.name);
              setPracticeMode(mode.name);
            }}
            className={styles.modeButton}
            style={{ backgroundColor: "transparent" }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.97)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {mode.label}
          </button>
        ))}
      </div>
    );
  }

  switch (practiceMode) {
    case "FlashingWords":
      return <FlashingWords selectedBook={selectedBook} />;
    case "MarginReading":
      return <MarginReading selectedBook={selectedBook} />;
    case "MirrorReading":
      return <MirrorReading selectedBook={selectedBook} />;
    case "BionicReading":
      return (
        <div className={styles.underConstruction}>
          🚧 This mode is under construction 🚧
        </div>
      );
    default:
      return null;
  }
}
