import { useEffect, useState, useRef } from "react";
import "./BionicReading.css";

export default function BionicReading({ selectedBook }) {
  const books = {
    "Sherlock Holmes 1": "/books/sherlock.txt",
    "Sherlock Holmes 2": "/books/sherlock2.txt",
  };

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const isTappedRef = useRef(false);

  useEffect(() => {
    const loadBook = async () => {
      const res = await fetch(books[selectedBook]);
      const text = await res.text();
      const words = text.trim().split(/\s+/);
      const wordsPerPage = 70;

      const paginated = [];
      for (let i = 0; i < words.length; i += wordsPerPage) {
        const pageWords = words.slice(i, i + wordsPerPage).join(" ");
        paginated.push(pageWords);
      }

      setPages(paginated);
      setCurrentPage(0);
    };

    loadBook();
  }, [selectedBook]);

  const handleTap = (e) => {
    if (isTappedRef.current) return;
    isTappedRef.current = true;
    setTimeout(() => {
      isTappedRef.current = false;
    }, 300);

    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const width = window.innerWidth;
    if (x < width / 2) {
      setCurrentPage((prev) => Math.max(0, prev - 1));
    } else {
      setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1));
    }
  };

  return (
    <div
      className="bionic-wrapper"
      onClick={handleTap}
      onTouchStart={handleTap}
    >
      <div className="bionic-page">
        {(pages[currentPage] || "").split(" ").map((word, i) => {
          const midpoint = Math.ceil(word.length / 2);
          return (
            <span key={i} className="bionic-word">
              <span className="bionic-bold">{word.slice(0, midpoint)}</span>
              {word.slice(midpoint)}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
}
