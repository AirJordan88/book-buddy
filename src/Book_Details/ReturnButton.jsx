import React, { useState } from "react";

function ReturnButton({ reservationId, refreshList }) {
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  function handleReturn() {
    setError("");

    fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Return failed");
        }
        refreshList(); // refresh list after successful delete
      })
      .catch(() => {
        setError("Error returning the book.");
      });
  }

  return (
    <div>
      <button onClick={handleReturn}>Return</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ReturnButton;
