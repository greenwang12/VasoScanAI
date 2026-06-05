import "../styles/dashboard.css";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [latestResult, setLatestResult] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetch("http://127.0.0.1:8000/history")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLatestResult(data[0]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="profile-avatar">👤</div>
        <h2>Welcome back {user?.email || ""}</h2>
      </header>

      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <div className="profile-card">
            <h3>User Profile</h3>
            <p className="email">{user?.email}</p>
          </div>

          <nav className="sidebar-menu">
            <button>Dashboard</button>

            <button
              onClick={() => {
                window.location.href = "/scan";
              }}
            >
              New Scan
            </button>

            <button
              onClick={() => {
                window.location.href = "/history";
              }}
            >
              Scan History
            </button>

            <button
              className="logout"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </nav>
        </aside>

        <main className="dashboard-content">

          {/* Metrics */}
          <section className="row metrics-row">

            <div className="card glass">
              <h4>Heart Rate</h4>
              <h2>
                {latestResult?.heart_rate || "--"} BPM
              </h2>
            </div>

            <div className="card glass">
              <h4>Risk Score</h4>
              <h2>
                {latestResult?.risk_score || "--"}%
              </h2>
            </div>

            <div className="card glass">
              <h4>Confidence</h4>
              <h2>
                {latestResult?.confidence || "--"}%
              </h2>
            </div>

            <div className="card glass">
              <h4>Prediction</h4>
              <h2>
                {latestResult?.prediction || "--"}
              </h2>
            </div>

          </section>

          {/* Latest Scan Summary */}
          <section className="row">

            <div className="card glass full-card">

              <h3>Latest Scan Summary</h3>

              {latestResult ? (
                <>
                  <p>
                    <strong>Prediction:</strong>{" "}
                    {latestResult.prediction}
                  </p>

                  <p>
                    <strong>Confidence:</strong>{" "}
                    {latestResult.confidence}%
                  </p>

                  <p>
                    <strong>Heart Rate:</strong>{" "}
                    {latestResult.heart_rate} BPM
                  </p>

                  <p>
                    <strong>Risk Score:</strong>{" "}
                    {latestResult.risk_score}
                  </p>
                </>
              ) : (
                <p>No scans available.</p>
              )}

            </div>

          </section>

          {/* AI Insight */}
          <section className="row">

            <div className="card glass full-card">

              <h3>AI Health Insight</h3>

              <p>
                {latestResult?.summary ||
                  "Upload and analyze a fingertip video to receive AI-powered cardiovascular insights."}
              </p>

            </div>

          </section>

          {/* Quick Actions */}
          <section className="row">

            <div className="card glass full-card">

              <h3>Quick Actions</h3>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "15px"
                }}
              >
                <button
                  className="primary"
                  onClick={() => {
                    window.location.href = "/scan";
                  }}
                >
                  Start New Scan
                </button>

                <button
                  className="primary"
                  onClick={() => {
                    window.location.href = "/history";
                  }}
                >
                  View History
                </button>
              </div>

            </div>

          </section>

        </main>
      </div>
    </div>
  );
}