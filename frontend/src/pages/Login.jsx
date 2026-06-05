import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/dashboard");
    } catch (err) {
      setError("Backend not reachable");
    }
  };

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-section">
          <div className="logo-box"></div>

          <div>
            <h1>VASOSCAN</h1>
            <p>AI Cardiovascular Intelligence</p>
          </div>
        </div>

        <div className="nav-links">
          <a href="#">Technology</a>
          <a href="#">Features</a>
          <a href="#">Research</a>
          <a href="#">About</a>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="hero-layout">
        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-badge">
            AI-Powered Cardiovascular Screening
          </div>

          <h1 className="hero-title">
            Understand Today.
            <br />
            <span>Protect Tomorrow.</span>
          </h1>

          <p className="hero-description">
            Advanced vPPG analysis, machine learning, and AI-powered
            health insights for proactive cardiovascular monitoring
            using only a smartphone fingertip video.
          </p>
        </div>

        {/* CENTER */}
        <div className="hero-center">
          <div className="ecg-line"></div>

          <img
            src="/heart.png"
            alt="Heart"
            className="heart-image"
          />
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="login-card">
            <h2>Welcome Back</h2>

            <p className="login-subtitle">
              Sign in to access your dashboard
            </p>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="error-text">{error}</p>
            )}

            <button
              className="login-btn"
              onClick={handleLogin}
            >
              Sign In
            </button>

            <p className="switch-text">
              New to VasoScan?{" "}
              <Link
                to="/register"
                className="link"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}