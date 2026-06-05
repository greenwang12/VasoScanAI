import "../styles/scan.css";
import { useRef, useState } from "react";

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

    setScanning(true);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/analyze-video",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();

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
              <h2>{result.prediction}</h2>
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

            <p>
              Extracted vPPG waveform and signal
              analytics will appear here once
              waveform visualization is connected.
            </p>

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

          {/* LLM Summary */}

          <section className="scan-card">

            <h2>AI Health Report</h2>

            <p>{result.summary}</p>

          </section>
        </>
      )}
    </div>
  );
}