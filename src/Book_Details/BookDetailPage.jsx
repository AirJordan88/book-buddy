import React, { useState, useEffect } from "react";

function BookDetailPage(props) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/{id}" +
        props.id
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("book data:", data);
        setBook(data);
      })
      .catch((err) => {
        console.log("error fetching book:", err);
      });
  }, [props.id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={book.cover} alt="cover" style={{ width: "200px" }} />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>{book.description}</p>
      <p>{book.available ? "Available" : "Not Available"}</p>
      <button disabled={!book.available}>Reserve</button>
    </div>
  );
}

export default BookDetailPage;
