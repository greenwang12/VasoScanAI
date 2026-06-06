import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Dashboard() {
  const [user] = useState(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});
  const [latestResult, setLatestResult] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
 

useEffect(() => {

  console.log("USER:", user);
  console.log("USER ID:", user?.id);
  console.log("LOCAL STORAGE USER:", localStorage.getItem("user"));
  console.log("LOCAL STORAGE USER_ID:", localStorage.getItem("user_id"));



if (!userId) return;

fetch(`http://127.0.0.1:8000/history/${userId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load dashboard");
      }
      return res.json();
    })
    .then((data) => {

      console.log("HISTORY RESPONSE:", data);

      if (Array.isArray(data) && data.length > 0) {
        setLatestResult(data[0]);
      }
    })
    .catch(console.error);

}, [user]);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="profile-avatar">👤</div>
        <h2>Welcome back {user?.name || user?.email}</h2>
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
                navigate("/scan");
              }}
            >
              New Scan
            </button>

            <button
              onClick={() => {
                navigate("/history");
              }}
            >
              Scan History
            </button>

            <button
              className="logout"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("user_id");
                navigate("/login");
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
          <section className="row">

  <div
    className={`status-banner ${
      latestResult?.prediction === "MI"
        ? "status-danger"
        : "status-normal"
    }`}
  >

    {latestResult?.prediction === "MI"
      ? "⚠ Elevated Cardiovascular Risk Detected"
      : "✅ Cardiovascular Screening Result: Normal"}

  </div>

</section>

          {/* Latest Scan Summary */}
 <section className="row">

  <div className="card glass full-card">

    <h3>Latest Scan Summary</h3>

    {latestResult ? (

      <div className="summary-grid">

        <div>
          <span>Prediction</span>

          <strong
            className={
              latestResult.prediction === "MI"
                ? "prediction-mi"
                : "prediction-normal"
            }
          >
            {latestResult.prediction}
          </strong>
        </div>

        <div>
          <span>Confidence</span>

          <strong>
            {latestResult.confidence}%
          </strong>
        </div>

        <div>
          <span>Heart Rate</span>

          <strong>
            {latestResult.heart_rate} BPM
          </strong>
        </div>

        <div>
          <span>Risk Score</span>

          <strong>
            {latestResult.risk_score}%
          </strong>
        </div>

        <div>
          <span>Scan Date</span>

          <strong>
            {new Date(
              latestResult.timestamp
            ).toLocaleDateString()}
          </strong>
        </div>

      </div>

    ) : (

      <p>No scans available.</p>

    )}

  </div>

</section>

          {/* AI Insight */}
<section className="row">

  <div className="card glass full-card">

    <h3>AI Health Insight</h3>

    <div className="dashboard-report">

      <ReactMarkdown>
        {
          latestResult?.summary ||
          "Upload and analyze a fingertip video to receive AI-powered cardiovascular insights."
        }
      </ReactMarkdown>

    </div>

  </div>

</section>
<section className="row">

  <div className="card glass full-card">

    <h3>Today's Health Tip</h3>

    <div className="health-tip">

      💧 Stay hydrated throughout the day to
      support healthy circulation and overall
      cardiovascular function.

    </div>

  </div>

</section>
<section className="row">

  <div className="card glass full-card">

    <h3>AI Highlights</h3>

    <ul className="highlight-list">

      <li>
        ✓ Latest cardiovascular analysis completed
      </li>

      <li>
        ✓ AI report generated successfully
      </li>

      <li>
        ✓ Prediction confidence:
        {" "}
        {latestResult?.confidence || "--"}%
      </li>

      <li>
        ✓ Heart rate detected:
        {" "}
        {latestResult?.heart_rate || "--"} BPM
      </li>

    </ul>

  </div>

</section>

          {/* Quick Actions */}
          <section className="row">

            <div className="card glass full-card">

              <h3>Quick Actions</h3>
<div className="action-buttons">
               <button
  className="primary"
  onClick={() => {
    navigate("/scan");
  }}
>
  Start New Scan
</button>

<button
  className="primary"
  onClick={() => {
    navigate("/history");
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