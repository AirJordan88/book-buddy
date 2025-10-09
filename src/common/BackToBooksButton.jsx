import { useNavigate } from "react-router-dom";

export default function BackToBooksButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/books")} className="back-button">
      ← Back to Books
    </button>
  );
}
