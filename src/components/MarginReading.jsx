import { useEffect, useRef, useState } from "react";
import "./MarginReading.css";

export default function MarginReading({ selectedBook }) {
  const books = {
    "Sherlock Holmes 1": "/books/sherlock.txt",
    "Sherlock Holmes 2": "/books/sherlock2.txt",
  };

  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const loadAndSplit = async () => {
      try {
        const res = await fetch(books[selectedBook]);
        const raw = await res.text();
        const text = raw.replace(/\s+/g, " ").trim();
        const words = text.split(" ");

        const container = containerRef.current;
        const probe = document.createElement("div");
        probe.style.position = "absolute";
        probe.style.visibility = "hidden";
        probe.style.lineHeight = "28px";
        probe.style.fontSize = "1.25rem";
        probe.style.maxWidth = "600px";
        probe.style.width = `${container.clientWidth}px`;
        probe.style.padding = "0";
        probe.style.textAlign = "justify";
        probe.style.fontFamily = "sans-serif";
        probe.style.whiteSpace = "normal";

        container.appendChild(probe);

        let buffer = "";
        let lastHeight = 0;
        let resultLines = [];

        for (let word of words) {
          buffer += word + " ";
          probe.innerText = buffer;
          const currentHeight = probe.clientHeight;
          const lineCount = Math.round(currentHeight / 28);

          if (lineCount > resultLines.length) {
            resultLines.push(buffer.trim());
          }

          if (resultLines.length >= 24) break;
        }

        container.removeChild(probe);
        setLines(resultLines);
        setActiveLine(0);
      } catch (err) {
        setLines(["⚠️ Failed to load the book."]);
      }
    };

    loadAndSplit();
  }, [selectedBook]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev < lines.length - 1 ? prev + 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [lines]);

  return (
    <div className="bionic-container" ref={containerRef}>
      <div className="bionic-text">
        {lines.map((line, i) => (
          <p key={i} className={i === activeLine ? "active-line" : ""}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
