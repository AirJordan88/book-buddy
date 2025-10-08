// src/catalognav/BooksPage.jsx
import { useState, useEffect } from "react";
import CatalogList from "./CatalogList";
// import CatalogSearch from "./CatalogSearch"; // enable when ready

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function syncBooks() {
    const url = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);

      if (!response.ok) {
        const text = await response.text();
        console.error("Books API non-OK response:", response.status, text);
        throw new Error(`Books API responded with status ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Books API returned non-JSON body:", text);
        throw new Error("Books API did not return JSON");
      }

      const data = await response.json();
      console.log("Books API data:", data);

      if (Array.isArray(data)) {
        setBooks(data);
      } else if (data && Array.isArray(data.books)) {
        setBooks(data.books);
      } else if (data && Array.isArray(data.data)) {
        setBooks(data.data);
      } else {
        console.error("Unexpected API response shape:", data);
        throw new Error("Unexpected API response format");
      }
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError("Could not load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    syncBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="books-page">
      <h1>Books</h1>
      {/* <CatalogSearch setBooks={setBooks} /> */}
      <CatalogList books={books} syncBooks={syncBooks} />
    </div>
  );
}
