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

  const readTime =
    parseSafe(localStorage.getItem("readTotalTime")) ||
    parseSafe(localStorage.getItem("readwriteTotalFlowTime")) ||
    computeFromStart("readwriteSectionStartTime");

  const visualTime =
    parseSafe(localStorage.getItem("visualTotalTime")) ||
    parseSafe(localStorage.getItem("visualTotalFlowTime")) ||
    computeFromStart("visualSectionStartTime");

  const audioTime =
    parseSafe(localStorage.getItem("audioTotalTime")) ||
    parseSafe(localStorage.getItem("audioTotalFlowTime")) ||
    computeFromStart("audioSectionStartTime");

  const kinestheticTime =
    parseSafe(localStorage.getItem("kinestheticTotalTime")) ||
    parseSafe(localStorage.getItem("kinestheticTotalFlowTime")) ||
    computeFromStart("kinestheticSectionStartTime");

  // Get user info
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const schoolname = user.schoolname || "";
  const rollno = user.rollno || "";

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

      <p>📖 Read Score: {readScore} (Time: {readTime}s)</p>
      <p>🖼️ Visual Score: {visualScore} (Time: {visualTime}s)</p>
      <p>🔊 Audio Score: {audioScore} (Time: {audioTime}s)</p>
      <p>🧩 Kinesthetic Score: {kinestheticScore} (Time: {kinestheticTime}s)</p>

      <h2>🎯 Predicted Learning Style: {predictedStyle} Learner</h2>

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
