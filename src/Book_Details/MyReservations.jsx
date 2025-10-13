import React, { useEffect, useState } from "react";
import ReturnButton from "./ReturnButton";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  function fetchReservations() {
    fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching reservations");
        return res.json();
      })
      .then((data) => {
        setReservations(data.reservations || []);
      })
      .catch(() => setError("Couldn't load reservations."));
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  if (error) return <p>{error}</p>;
  if (reservations.length === 0)
    return <p>You have no current reservations.</p>;

  return (
    <div>
      {reservations.map((res) => (
        <div
          key={res.id}
          style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}
        >
          <img
            src={res.coverimage}
            alt={res.title}
            style={{ width: "100px" }}
          />
          <h3>{res.title}</h3>
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
