import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to LLM Chat</h1>
      <button onClick={() => navigate("/chat")}>Enter</button>
    </div>
  );
};

export default LandingPage;
