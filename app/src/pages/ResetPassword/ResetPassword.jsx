import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/login.jpg";
import api from '../../api/api';

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
      <form
        onSubmit={handleReset}
        style={{
          width: "495px",
          padding: "32px",
          borderRadius: "4px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h2
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "100%",
            letterSpacing: "0.15px",
            textAlign: "center",
            color: "#00000099",
            margin: "0 auto 16px auto",
          }}
        >
          Reset Password
        </h2>

        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "431px",
            height: "48px",
            borderRadius: "4px",
            paddingTop: "16px",
            paddingRight: "12px",
            paddingBottom: "16px",
            paddingLeft: "16px",
            border: "1px solid #0000001F",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "0.15px",
            color: "#00000099",
            backgroundColor: "#fff",
            outline: "none",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            height: "36px",
            padding: "12px 16px",
            borderRadius: "4px",
            backgroundColor: "#3392EA",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, sans-serif",
            fontSize: "14px",
            letterSpacing: "1.25px",
          }}
        >
          {loading ? "Sending..." : "SEND PASSWORD RESET LINK"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            width: "431px",
            height: "36px",
            borderRadius: "4px",
            paddingTop: "12px",
            paddingRight: "16px",
            paddingBottom: "12px",
            paddingLeft: "16px",
            border: "1px solid #00000099",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "1.25px",
              color: "#00000099",
            }}
          >
            RETURN TO LOGIN
          </span>
        </button>

        <p
          style={{
            width: "431px",
            height: "24px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "24px",
            letterSpacing: "0.4px",
            textAlign: "center",
            verticalAlign: "middle",
            color: "rgba(0,0,0,0.6)",
            opacity: 1,
            margin: "16px auto 0 auto",
          }}
        >
          ©2025 ICT Cortex. All rights reserved.
        </p>

        {message && (
          <p
            style={{
              color: "green",
              textAlign: "center",
              fontWeight: "600",
              marginTop: "8px",
            }}
          >
            {message}
          </p>
        )}

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "600",
              marginTop: "8px",
            }}
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
