import "../styles/history.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalScans = history.length;

  const normalScans = history.filter(
    (scan) => scan.prediction === "Normal"
  ).length;

  const miScans = history.filter(
    (scan) => scan.prediction === "MI"
  ).length;

  return (
    <div className="history-page">

      <div className="history-header">
        <h1>VasoScan History</h1>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>

      {/* Summary Cards */}

      <div className="history-stats">

        <div className="stat-card">
          <h4>Total Scans</h4>
          <h2>{totalScans}</h2>
        </div>

        <div className="stat-card">
          <h4>Normal Results</h4>
          <h2>{normalScans}</h2>
        </div>

        <div className="stat-card">
          <h4>MI Results</h4>
          <h2>{miScans}</h2>
        </div>

      </div>

      {/* Future Trend Graph */}

      <div className="history-card trend-card">
        <h3>Trend Analytics</h3>

        <p>
          Heart Rate, Risk Score and Prediction
          trends will be visualized here as
          more scans are collected.
        </p>
      </div>

      {/* History Records */}

      {loading ? (
        <div className="history-card">
          Loading scan history...
        </div>
      ) : history.length === 0 ? (
        <div className="history-card">
          No scan history available.
        </div>
      ) : (
        history.map((scan) => (
          <div
            key={scan.id}
            className="history-card"
          >
            <div className="history-top">

              <h3>
                {scan.prediction}
              </h3>

              <span className="confidence">
                {scan.confidence}%
              </span>

            </div>

            <div className="history-grid">

              <div>
                <strong>Heart Rate</strong>
                <p>{scan.heart_rate} BPM</p>
              </div>

              <div>
                <strong>Risk Score</strong>
                <p>{scan.risk_score}</p>
              </div>

              <div>
                <strong>File</strong>
                <p>{scan.filename}</p>
              </div>

              <div>
                <strong>Date</strong>
                <p>
                  {scan.timestamp
                    ? new Date(
                        scan.timestamp
                      ).toLocaleString()
                    : "N/A"}
                </p>
              </div>

            </div>

            {scan.summary && (
              <div className="summary-box">

                <h4>
                  AI Health Report
                </h4>

                <p>
                  {scan.summary}
                </p>

              </div>
            )}

          </div>
        ))
      )}

    </div>
  );
}