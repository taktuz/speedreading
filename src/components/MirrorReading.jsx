import { useEffect, useState } from "react";
import "./MirrorReading.css"; // ✅ this stays as it is

export default function MirrorReading({ selectedBook }) {
  const books = {
    "Sherlock Holmes 1": "/books/sherlock.txt",
    "Sherlock Holmes 2": "/books/sherlock2.txt",
  };

  const [text, setText] = useState("");

  useEffect(() => {
    fetch(books[selectedBook])
      .then((res) => res.text())
      .then((data) => setText(data));
  }, [selectedBook]);

  return (
    <div className="container">
      {" "}
      {/* ⬅ no 'styles.' */}
      {text ? (
        text.split("\n").map((line, i) => (
          <p key={i} className="mirroredText">
            {line}
          </p>
        ))
      ) : (
        <p className="loading">Loading book...</p>
      )}
    </div>
  );
}
