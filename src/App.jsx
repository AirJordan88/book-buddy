import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./catalognav/Layout";
import BookDetailPage from "./Book_Details/BookDetailPage";
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BookDetailPage />} />

        <Route path="/books" element={<BookDetailPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
