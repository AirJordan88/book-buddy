import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./catalognav/Layout";
import BookDetailPage from "./Book_Details/BookDetailPage";
import Register from "./auth/Register";

function App() {
  return (
    <Routes>
      <Route index element={<BookDetailPage />} />

      <Route path="/books" element={<BookDetailPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
