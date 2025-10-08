import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function CatalogList({ books, syncBooks }) {
  if (!books || books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <ul>
      {books.map((book) => (
        <CatalogListItem key={book.id} book={book} syncBooks={syncBooks} />
      ))}
    </ul>
  );
}

function CatalogListItem({ book, syncBooks }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  // Placeholder for Reserve Book Action
  const reserveBook = async () => {
    setError(null);

    try {
      alert(`You have checked out: ${book.title}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <li className="catalog-item" style={{ marginBottom: "1rem" }}>
      <Link
        to={`/books/${book.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={book.coverimage}
          alt={`${book.title} cover`}
          width="100"
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.available ? "Available ✅" : "Checked Out ❌"}</p>
      </Link>
      {token && <button onClick={reserveBook}>Reserve Book</button>}
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
