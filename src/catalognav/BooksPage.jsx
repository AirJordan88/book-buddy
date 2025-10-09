import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CatalogList from "./CatalogList";
import CatalogSearch from "./CatalogSearch";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const location = useLocation(); // ✅ detects when user navigates

  async function syncBooks() {
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
      );
      const data = await response.json();
      const allBooks = Array.isArray(data) ? data : data.books;
      setBooks(allBooks);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }

  // ✅ Whenever the user navigates (even to the same page), re-fetch
  useEffect(() => {
    syncBooks();
  }, [location]);

  return (
    <div>
      <h1>Books</h1>
      <CatalogSearch setBooks={setBooks} />
      <CatalogList books={books} syncBooks={syncBooks} />
    </div>
  );
}
