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
      <p>📚 Book Buddy</p>
      <nav>
        <Link to="/books">Books</Link>
        {token ? (
          <>
            <Link to="/account">Account</Link>
            <button onClick={handleLogout}>Log Out</button>
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
