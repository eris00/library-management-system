import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/login.jpg";
import { loginUser } from "../../api/AuthServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password); 
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
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
    boxSizing: "border-box",
    opacity: 1,
    fontFamily: "'Poppins', sans-serif"
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "495px",
          height: "429px",
          padding: "32px",
          gap: "16px",
          borderRadius: "4px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            width: "431px",
            height: "23px",
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
          Login
        </h2>

        <div
          style={{
            width: "431px",
            height: "66px",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="email"
            style={{
              position: "absolute",
              top: "-10px",
              left: "12px",
              backgroundColor: "#FFFFFF",
              padding: "4px",
              fontSize: "14px",
              fontFamily: "Roboto, sans-serif",
              color: "#3392EA",
            }}
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="example@example.net"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "431px",
              height: "48px",
              padding: "16px 12px 16px 16px",
              borderRadius: "4px",
              border: "1px solid #3392EA",
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: "Roboto, sans-serif",
              lineHeight: "100%",
              letterSpacing: "0px",
              color: "#000",
              backgroundColor: "#fff",
              outline: "none",
            }}
          />
        </div>

        <div
          style={{
            width: "431px",
            height: "66px",
            display: "flex",
            alignItems: "center",
            marginTop: "0px",
          }}
        >
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "431px",
              height: "48px",
              padding: "16px 12px 16px 16px",
              borderRadius: "4px",
              border: "1px solid #0000001F",
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: "Roboto, sans-serif",
              color: "#000",
              backgroundColor: "#fff",
              outline: "none",
            }}
          />
        </div>

        <div
          style={{
            width: "431px",
            height: "36px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
            opacity: 1,
          }}
        >
          <button
            type="button"
            style={{
              padding: "10px 8px",
              height: "36px",
              background: "none",
              border: "none",
              color: "#3392EA",
              fontFamily: "Roboto, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/reset-password")
            }
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "431px",
            height: "36px",
            padding: "12px 16px",
            borderRadius: "4px",
            backgroundColor: loading ? "#8bbcf9" : "#3392EA",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            opacity: 1,
            color: "#FFFFFF",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            letterSpacing: "1.25px",
            userSelect: "none",
            verticalAlign: "middle",
            transition: "background-color 0.3s ease",
          }}
        >
          {loading ? "Logging in..." : "LOG IN"}
        </button>

        <button
        type="button"
        onClick={() => navigate('/register')}
        style={{
            width: "431px",
            height: "36px",
            borderRadius: "4px",
            border: "1px solid #00000099",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            backgroundColor: "transparent",
            cursor: "pointer",
            opacity: 1,
        }}
        >
        <span
        style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            width: "136px",
            height: "16px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "16px",
            letterSpacing: "1.25px",
            color: "rgba(0,0,0,0.6)",
            opacity: 1,
            verticalAlign: "middle",
        }}
        >
        CREATE ACCOUNT
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

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "600",
              marginTop: "10px",
            }}
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
