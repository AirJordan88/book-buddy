import React, { useState, useEffect } from "react";

function AccountPage() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You need to log in to see your account.");
      return;
    }

    fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res.json();
      })
      .then((data) => {
        setReservations(data.reservations || []);
      })
      .catch(() => {
        setError("Error loading your reservations.");
      });
  }, [token]);

  function handleReturn(bookId) {
    fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Return failed");

        setReservations(reservations.filter((b) => b.id !== bookId));
      })
      .catch(() => {
        setError("Error returning the book.");
      });
  }

  if (!token) {
    return <div>Please log in to view your reservations.</div>;
  }

  if (!reservations.length) {
    return <div>No books reserved yet.</div>;
  }

  return (
    <div>
      <h1>My Reservations</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservations.map((book) => (
        <div
          key={book.id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <img src={book.cover} alt={book.title} style={{ width: "100px" }} />
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <button onClick={() => handleReturn(book.id)}>Return</button>
        </div>
      ))}
    </div>
  );
}

export default AccountPage;
