import { useState } from "react";
import "../index.css";
import BackToBooksButton from "../common/BackToBooksButton"; // ✅ import it

export default function CatalogSearch({ setBooks }) {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [resultsFound, setResultsFound] = useState(true);

  async function handleSearch() {
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const allBooks = Array.isArray(data) ? data : data.books;

      if (!Array.isArray(allBooks)) {
        throw new Error("Unexpected API format — expected an array of books.");
      }

      const filteredBooks = allBooks.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );

      setBooks(filteredBooks);
      setSearched(true);
      setResultsFound(filteredBooks.length > 0);
    } catch (err) {
      console.error("❌ Search failed:", err);
      alert(
        "Failed to connect to the Book Buddy API. Please check the URL or network."
      );
    }
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="catalog-search">
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Conditional Message */}
      {searched && !resultsFound && (
        <p className="no-results-message">No books found matching "{query}".</p>
      )}

      {/* ✅ Always show Back button after any search */}
      {searched && (
        <div className="back-to-books-container">
          <BackToBooksButton />
        </div>
      )}
    </div>
  );
}
