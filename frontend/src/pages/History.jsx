import "../styles/history.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

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

  const trendData = history.map((scan) => ({
    date: scan.timestamp
      ? new Date(scan.timestamp).toLocaleDateString()
      : "N/A",

    heartRate: scan.heart_rate,
    riskScore: scan.risk_score
  }));

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

      {/* Stats */}

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

      {/* Trend Analytics */}

      {history.length > 0 && (

        <div className="history-card trend-card">

          <h3 className="trend-title">
            Trend Analytics
          </h3>

          <p className="trend-subtitle">
            Heart Rate and Risk Score trends across all scans
          </p>

          <div className="trend-chart">

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart data={trendData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.2}
                />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="heartRate"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                  name="Heart Rate"
                />

                <Bar
                  dataKey="riskScore"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  name="Risk Score"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}

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

              <h3
                className={
                  scan.prediction === "MI"
                    ? "prediction-mi"
                    : "prediction-normal"
                }
              >
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
                <p title={scan.filename}>
                  {scan.filename?.length > 35
                    ? scan.filename.slice(0, 35) + "..."
                    : scan.filename}
                </p>
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

                <div className="history-report">

                  <ReactMarkdown>
                    {scan.summary}
                  </ReactMarkdown>

                </div>

              </div>

            )}

          </div>

        ))

      )}

    </div>
  );
}