import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/books");
  }

  return (
    <header className="navbar">
      <div className="bookbuddy">
        <img src="/books.png" alt="book buddy" />
        <p>Book Buddy</p>
      </div>

      <nav>
        <Link to="/books">Books</Link>
        {token ? (
          <>
            <Link to="/account">Account</Link>
            <Link onClick={handleLogout}>Log Out</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
