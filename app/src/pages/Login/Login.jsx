import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/login.jpg";
import api from "../../api/api";
import useAuthStore from "../../store/authStore";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", { 
        username: email, 
        password, 
        device: "web" 
      });

      const token = response.data?.data?.token;

      if (token) {
        login(null, token);
        await useAuthStore.getState().fetchMe();
        navigate("/dashboard");
      } else {
        setError("Login failed. Invalid response from server.");
      }
    } catch (err) {
      const backendError = err?.response?.data?.message;
      setError(backendError || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Login</h2>

        <div className="input-container">
          <label htmlFor="email" className="input-label">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="input-container">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="forgot-password-container">
          <button
            type="button"
            className="forgot-password-button"
            onClick={() => navigate("/reset-password")}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" disabled={loading} className="login-button">
          {loading ? "Logging in..." : "LOG IN"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="create-account-button"
        >
          CREATE ACCOUNT
        </button>

        <p className="footer-text">©2025 ICT Cortex. All rights reserved.</p>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
