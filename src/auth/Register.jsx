import { useAuth } from "./AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  /** Access the register() from AuthContext */
  const { register } = useAuth();

  /** error state for form validation */
  const [error, setError] = useState(null);

  /** naviagte after a successful registration */
  const navigate = useNavigate();

  /** handles form submission and calls the register API */
  const tryRegister = async (formData) => {
    setError(null);

    /** get form values */
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await register({ firstname, lastname, email, password });
      navigate("/login"); /** redirect a user after sucessful registration */
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>

      <form action={tryRegister}>
        <label>
          First Name
          <input type="text" name="firstname" />
        </label>

        <label>
          Last Name
          <input type="text" name="lastname" />
        </label>

        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button>Register</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="/login"> Already have an account? click here to login.</Link>
    </>
  );
}
