import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const { setPage } = usePage();

  return (
    <header>
      <p>📚 Book Buddy</p>
      <nav>
        <a onClick={() => setPage("books")}>Books</a>
        {token ? (
          <>
            <a onClick={() => setPage("account")}>Account</a>
            <a onClick={() => logout()}>Log Out</a>
          </>
        ) : (
          <>
            <a onClick={() => setPage("register")}>Register</a>
            <a onClick={() => setPage("login")}>Login</a>
          </>
        )}
      </nav>
    </header>
  );
}
