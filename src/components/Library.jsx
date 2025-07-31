import "./Library.css";

export default function Library({ setScreen }) {
  const books = [
    { title: "Sherlock Holmes 1", file: "/books/sherlock.txt" },
    { title: "Sherlock Holmes 2", file: "/books/sherlock2.txt" },
  ];

  return (
    <div className="library-container">
      <h2 className="library-title">Library 📚</h2>
      <ul className="book-list">
        {books.map((book, index) => (
          <li key={index} className="book-item">
            <a href={book.file} download className="book-link">
              {book.title}
            </a>
          </li>
        ))}
      </ul>
      <button className="back-home-button" onClick={() => setScreen("home")}>
        ← Back to Home
      </button>
    </div>
  );
}
