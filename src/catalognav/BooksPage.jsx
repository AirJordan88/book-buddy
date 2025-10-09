import { useState, useEffect } from "react";
//import CatalogSearch from "./CatalogSearch"; <== commented this out for now :)
import CatalogList from "./CatalogList";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  async function syncBooks() {
    const response = await fetch(
      "https://fsa-book-buddy-b6e74d1380d.herokuapp.com/api/books"
    );
    const data = await response.json();
    setBooks(data.books);
  }

  useEffect(() => {
    syncBooks();
  }, []);

  return (
    <div>
      <h1>Books</h1>
      {/** <CatalogSearch setBooks={setBooks} /> <= this aswell */}
      <CatalogList books={books} syncBooks={syncBooks} />
    </div>
  );
}
