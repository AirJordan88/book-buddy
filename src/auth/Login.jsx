import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  /** access login function from AuthContext */
  const { login } = useAuth();

  /** holds an error message */
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /** handles form submission and login logic */
  const handleLogin = async (formData) => {
    setError(null);

    /** get form values */
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await login({ email, password });
      navigate("/account"); /** redirect a user after sucessful login */
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Log in to your account</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(new FormData(e.target));
        }}
      >
        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button type="submit">Login</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="/register">Need an account? Register here. </Link>
    </>
  );
}
