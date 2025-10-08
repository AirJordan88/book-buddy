import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Account() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // handle logout + redirect
  const handleLogout = () => {
    logout();
    navigate("/books");
  };

  // if not logged in, don't display
  if (!isLoggedIn) {
    return (
      <>
        <p>You need to log in to see your account.</p>
        <Link to="/login">Click here to log in~~</Link>
      </>
    );
  }

  return (
    <>
      <div>
        <h1>Welcome, {user?.firstname || "User"}!</h1>
        <p>Your email on file with us is {user?.email}</p>
      </div>

      <div>
        <h2>Your reservations</h2>
        <p>Role C will add this later</p>
      </div>
    </>
  );
}
