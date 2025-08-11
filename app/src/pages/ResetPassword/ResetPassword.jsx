import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/login.jpg";
import api from '../../api/api';
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api.post('/forgot_password', { email });
      setMessage("Link for reseting your password has been sent to your email.");
    } catch (err) {
      const backendMessage = err?.response?.data?.message;
      setError(backendMessage || "Reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="reset-wrapper"
      style={{ backgroundImage: `url(${background})` }}
    >
      <form className="reset-form" onSubmit={handleReset}>
        <h2 className="reset-title">Reset Password</h2>

        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="reset-input"
        />

        <button type="submit" disabled={loading} className="reset-button">
          {loading ? "Sending..." : "SEND PASSWORD RESET LINK"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="back-button"
        >
          <span className="back-button-text">RETURN TO LOGIN</span>
        </button>

        <p className="reset-footer">©2025 ICT Cortex. All rights reserved.</p>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
