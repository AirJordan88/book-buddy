import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./catalognav/Layout";
import BookDetailPage from "./Book_Details/BookDetailPage";
import Register from "./auth/Register";
import BooksPage from "./catalognav/BooksPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
