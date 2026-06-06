import "../styles/scan.css";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";


export default function Scan() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const fileInputRef = useRef(null);

  const handleChooseVideo = () => {
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleScanVideo = async () => {
    if (!selectedFile || scanning) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user_id", localStorage.getItem("user_id"));

    setScanning(true);

    try {
      console.log("user_id =", localStorage.getItem("user_id"));

for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
      const res = await fetch(
        "http://127.0.0.1:8000/analyze-video",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();

console.log("FULL RESPONSE:", data);

      if (data.error) {
        alert(data.error);
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Scan failed");
    } finally {
      setScanning(false);
    }
  };

 const waveformData =
  result?.waveform?.map((value, index) => ({
    index,
    value
  })) || [];

  return (
    <div className="scan-page">

      <header className="scan-header">
        <h1>VasoScan Analysis Engine</h1>

        <button
          className="back-btn"
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          Dashboard
        </button>
      </header>

      {/* Upload Section */}

      <section className="scan-card">

        <h2>Upload Fingertip Video</h2>

        <p>
          Upload a fingertip micro blood flow
          recording for AI-based vascular analysis.
        </p>

        <button
          className="primary-btn"
          onClick={handleChooseVideo}
        >
          Choose Video
        </button>

        <input
          type="file"
          hidden
          accept="video/*"
          ref={fileInputRef}
          onChange={handleFileSelected}
        />

        {selectedFile && (
          <>
            <p className="file-name">
              {selectedFile.name}
            </p>

            <button
              className="primary-btn"
              onClick={handleScanVideo}
              disabled={scanning}
            >
              {scanning
                ? "Analyzing..."
                : "Analyze Video"}
            </button>
          </>
        )}

      </section>

      {/* Prediction Results */}

      {result && (
        <>
          <section className="metrics-grid">

            <div className="metric-card">
              <h4>Prediction</h4>
              <h2
  className={
    result.prediction === "MI"
      ? "metric-value-mi"
      : "metric-value-normal"
  }
>
  {result.prediction}
</h2>
            </div>

            <div className="metric-card">
              <h4>Confidence</h4>
              <h2>{result.confidence}%</h2>
            </div>

            <div className="metric-card">
              <h4>Heart Rate</h4>
              <h2>{result.heart_rate} BPM</h2>
            </div>

            <div className="metric-card">
              <h4>Risk Score</h4>
              <h2>{result.risk_score}</h2>
            </div>

          </section>

          {/* Waveform Section */}

          <section className="scan-card">

  <h2>Waveform Analysis</h2>

  <div className="waveform-chart">

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <LineChart data={waveformData}>

        <XAxis
          dataKey="index"
          hide
        />

        <YAxis hide />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#10b981"
          strokeWidth={3}
          dot={false}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

</section>

          {/* Explainable AI */}

           <section className="scan-card">

  <h2>Explainable AI</h2>

  {result.explanation?.length > 0 ? (

    <div className="explanation-list">

      {result.explanation.map((item, index) => (

        <div
          key={index}
          className="explanation-item"
        >
          <strong>{item.feature}</strong>

          <span>
            Importance: {item.importance}
          </span>
        </div>

      ))}

    </div>

  ) : (

    <p>
      No explanation data available.
    </p>

  )}

</section>

<section className="scan-card">

  <h2>AI Insights</h2>

  {result.insights?.map((item, index) => (

    <div
      key={index}
      className="insight-card"
    >

      <div className="insight-header">

        <h3>{item.feature}</h3>

        <span className={`impact ${item.impact.toLowerCase()}`}>
          {item.impact} Impact
        </span>

      </div>

      <p>{item.description}</p>

    </div>

  ))}

</section>

          {/* LLM Summary */}

         <section className="scan-card">

  <h2>AI Health Report</h2>

  <div className="report-content">
    <ReactMarkdown>
      {result.summary}
    </ReactMarkdown>
  </div>

</section>
        </>
      )}
    </div>
  );
}