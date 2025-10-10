import React, { useState, useEffect } from "react";
import ReturnButton from "../components/ReturnButton";

function AccountPage() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  function fetchReservations() {
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
  }

  useEffect(() => {
    if (token) {
      fetchReservations();
    } else {
      setError("You need to log in to see your account.");
    }
  }, [token]);

  if (!token) {
    return <div>Please log in to view your reservations.</div>;
  }

  if (reservations.length === 0) {
    return <div>No books reserved yet.</div>;
  }

  return (
    <div>
      <h1>My Reservations</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservations.map((res) => (
        <div
          key={res.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <img
            src={res.coverimage}
            alt={res.title}
            style={{ width: "100px" }}
          />
          <h2>{res.title}</h2>
          <p>{res.author}</p>
          <ReturnButton
            reservationId={res.id}
            refreshList={fetchReservations}
          />
        </div>
      ))}
    </div>
  );
}

export default AccountPage;
