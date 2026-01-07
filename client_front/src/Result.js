// client_front/src/Result.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const ResultContainer = styled.div`
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  min-height: 100vh;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e55347;
  }
`;

const Result = () => {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState("");
  const [prediction, setPrediction] = useState(null);

  // Fetch scores & times from localStorage (keys written by SectionResult)
  const readScore = parseInt(localStorage.getItem("readTotalScore")) || 0;
  const visualScore = parseInt(localStorage.getItem("visualTotalScore")) || 0;
  const audioScore = parseInt(localStorage.getItem("audioTotalScore")) || 0;
  const kinestheticScore = parseInt(localStorage.getItem("kinestheticTotalScore")) || 0;

  // Resolve times with fallbacks: explicit total, section-specific flow total, or compute from section start
  const parseSafe = (v) => {
    const n = parseInt(v, 10);
    return Number.isNaN(n) ? 0 : n;
  };

  const computeFromStart = (startKey) => {
    const start = parseInt(localStorage.getItem(startKey), 10);
    if (!start || Number.isNaN(start)) return 0;
    return Math.floor((Date.now() - start) / 1000);
  };

  // Try many possible storage keys for a section and return the first positive value
  const resolveSectionTime = (section, legacyReadKey) => {
    const candidates = [];
    // explicit old-format keys (what some Quiz3 components set)
    if (legacyReadKey) candidates.push(legacyReadKey);
    candidates.push(`${section}TotalTime`);
    candidates.push(`${section}TotalSectionTime`);
    candidates.push(`${section}TotalFlowTime`);
    candidates.push(`${section}TotalFlowTime`);
    // finalTime / flow keys
    candidates.push(`${section}TotalFlowTime`);
    // compute from start if present
    candidates.push(`${section}SectionStartTime`);

    for (const key of candidates) {
      const val = localStorage.getItem(key);
      if (!val) continue;
      const n = parseSafe(val);
      if (n > 0) {
        console.log(`Result: using ${key}=${n} for section ${section}`);
        return n;
      }
      // If key is a timestamp (start time), compute elapsed
      if (key.endsWith("SectionStartTime")) {
        const start = parseInt(val, 10);
        if (start && !Number.isNaN(start)) {
          const elapsed = Math.floor((Date.now() - start) / 1000);
          console.log(`Result: computed elapsed=${elapsed} from ${key} for section ${section}`);
          return elapsed;
        }
      }
    }

    return 0;
  };

  const readTime =
    resolveSectionTime("readwrite", "readTotalTime");

  const visualTime =
    resolveSectionTime("visual", "visualTotalTime");

  const audioTime =
    resolveSectionTime("audio", "audioTotalTime");

  const kinestheticTime =
    resolveSectionTime("kinesthetic", "kinestheticTotalTime");

  // Get user info
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const schoolname = user.schoolname || "";
  const rollno = user.rollno || "";

  const formatTime = (seconds) => {
    if (!seconds || seconds === 0) return "0s";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    } else if (mins > 0) {
      return `${mins}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Determine predicted style (from scores)
  const scoreMap = {
    Read: readScore,
    Visual: visualScore,
    Auditory: audioScore,
    Kinesthetic: kinestheticScore,
  };
  const predictedStyle = Object.keys(scoreMap).reduce((a, b) =>
    scoreMap[a] > scoreMap[b] ? a : b
  );

  // Save predicted style locally
  useEffect(() => {
    if (predictedStyle) {
      localStorage.setItem("predictedStyle", predictedStyle);
      localStorage.setItem("learningStyle", predictedStyle.toLowerCase());
    }
  }, [predictedStyle]);

  // Backend URL
  const BACKEND_URL = "http://localhost:5000/api/results";

  // Auto-save results to backend & get prediction
  useEffect(() => {
    if (!schoolname || !rollno) {
      setSaveStatus("⚠️ Login required to save results");
      return;
    }

    const pushResults = async () => {
      try {
        const payload = {
          schoolname,
          rollno,
          readWriteScore: readScore,
          readWriteTime: readTime,
          visualScore,
          visualTime,
          audioScore,
          audioTime,
          kinestheticScore,
          kinestheticTime,
          predictedStyle,
        };

        const resp = await axios.post(BACKEND_URL, payload);

        if (resp.status === 200) {
          setSaveStatus("✅ Results saved and prediction received!");
          setPrediction(resp.data);
          // Prefer backend primary style as the canonical predicted style
          if (resp.data.primaryStyle) {
            localStorage.setItem("predictedStyle", resp.data.primaryStyle);
            localStorage.setItem("learningStyle", resp.data.primaryStyle.toLowerCase());
          }
        } else {
          setSaveStatus("❌ Failed to save results");
        }
      } catch (err) {
        console.error("Error saving results:", err);
        setSaveStatus("⚠️ Error saving results");
      }
    };

    pushResults();
  }, [
    BACKEND_URL,
    schoolname,
    rollno,
    readScore,
    readTime,
    visualScore,
    visualTime,
    audioScore,
    audioTime,
    kinestheticScore,
    kinestheticTime,
    predictedStyle,
  ]);

  return (
    <ResultContainer>
      <h1>Your Final Result</h1>

      <p>📖 Read Score: {readScore} (Time: {formatTime(readTime)})</p>
      <p>🖼️ Visual Score: {visualScore} (Time: {formatTime(visualTime)})</p>
      <p>🔊 Audio Score: {audioScore} (Time: {formatTime(audioTime)})</p>
      <p>🧩 Kinesthetic Score: {kinestheticScore} (Time: {formatTime(kinestheticTime)})</p>

      <h2>🎯 Predicted Learning Style: {(prediction?.primaryStyle || predictedStyle)} Learner</h2>

      {prediction?.finalPercentages && (
        <>
          <h3>📊 Learning Style Distribution</h3>
          {Object.entries(prediction.finalPercentages).map(([style, percent]) => (
            <p key={style}>
              {style}: {percent}%
            </p>
          ))}

        
        <h2>🥇 Primary: {prediction.primaryStyle || "N/A"}</h2>
          <h2>🥈 Secondary: {prediction.secondaryStyle || "N/A"}</h2>
        </>
      )}

      {saveStatus && <p>{saveStatus}</p>}

      <SubmitButton onClick={() => navigate("/learning")}>Return Home</SubmitButton>
    </ResultContainer>
  );
};

export default Result;
