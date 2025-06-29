import { useEffect, useState } from "react";
import "./BionicReading.css";

export default function BionicReading({ selectedBook }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const loadBook = async () => {
      try {
        const res = await fetch(
          selectedBook === "Sherlock Holmes 1"
            ? "/books/sherlock.txt"
            : "/books/sherlock2.txt"
        );
        const raw = await res.text();
        setText(raw);
      } catch (err) {
        console.error("Failed to load book:", err);
      }
    };

    loadBook();
  }, [selectedBook]);

  function splitWord(word) {
    const splitIndex = Math.floor(word.length / 2);
    const bold = word.slice(0, splitIndex);
    const normal = word.slice(splitIndex);
    return `<strong>${bold}</strong>${normal}`;
  }

  const formatted = text
    .split(/\s+/)
    .map((word) => splitWord(word))
    .join(" ");

  return (
    <div className="bionic-container">
      <div
        className="bionic-text"
        dangerouslySetInnerHTML={{ __html: formatted }}
      ></div>
    </div>
  );
}
