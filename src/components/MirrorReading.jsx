import { useEffect, useState } from "react";
import "./MirrorReading.css"; // ✅ CORRECT

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
    <div className={styles.container}>
      {text ? (
        text.split("\n").map((line, i) => (
          <p key={i} className={styles.mirroredText}>
            {line}
          </p>
        ))
      ) : (
        <p className={styles.loading}>Loading book...</p>
      )}
    </div>
  );
}
