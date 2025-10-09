import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function CatalogList({ books, syncBooks }) {
  if (!books) return null; // ✅ Don't show anything until we know the results

  return (
    <ul>
      {books.map((book) => (
        <CatalogListItem key={book.id} book={book} syncBooks={syncBooks} />
      ))}
    </ul>
  );
}

function CatalogListItem({ book }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const reserveBook = async () => {
    setError(null);
    try {
      alert(`You have checked out: ${book.title}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <li className="catalog-item">
      <Link to={`/books/${book.id}`}>
        <img src={book.coverimage} alt={`${book.title} cover`} width="100" />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.available ? "Available ✅" : "Checked Out ❌"}</p>
      </Link>

      {token && <button onClick={reserveBook}>Reserve Book</button>}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
    </li>
  );
}
