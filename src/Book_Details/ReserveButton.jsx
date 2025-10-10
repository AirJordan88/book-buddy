import React, { useState } from "react";

function ReserveButton({ book, refreshBook }) {
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  function handleReserve() {
    setError("");

    if (!token) {
      setError("You must be logged in to reserve.");
      return;
    }
    if (!book.available) {
      setError("This book is not available.");
      return;
    }

    fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: book.id }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Reservation failed");
        return res.json();
      })
      .then(() => refreshBook())
      .catch(() => setError("Already reserved or error reserving."));
  }

  return (
    <div>
      <button onClick={handleReserve} disabled={!book.available}>
        Reserve
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ReserveButton;
