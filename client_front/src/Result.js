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

  // ✅ Fetch total scores & times from localStorage
  const readScore = parseInt(localStorage.getItem("readScore")) || 0;
  const visualScore = parseInt(localStorage.getItem("visualScore")) || 0;
  const audioScore = parseInt(localStorage.getItem("audioScore")) || 0;
  const kinestheticScore = parseInt(localStorage.getItem("kinestheticScore")) || 0;

  const readTime = parseInt(localStorage.getItem("readTime")) || 0;
  const visualTime = parseInt(localStorage.getItem("visualTime")) || 0;
  const audioTime = parseInt(localStorage.getItem("audioTime")) || 0;
  const kinestheticTime = parseInt(localStorage.getItem("kinestheticTime")) || 0;

  // ✅ Get user info
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const schoolname = user.schoolname || "";
  const rollno = user.rollno || "";

  // ✅ Determine predicted learning style
  const scoreMap = {
    Read: readScore,
    Visual: visualScore,
    Auditory: audioScore,
    Kinesthetic: kinestheticScore,
  };

  const predictedStyle = Object.keys(scoreMap).reduce((a, b) =>
    scoreMap[a] > scoreMap[b] ? a : b
  );

  // ✅ Automatically push results when data available
  useEffect(() => {
    const pushResults = async () => {
      if (!schoolname || !rollno) {
        setSaveStatus("⚠️ Login required to save results");
        return;
      }

      try {
        const resp = await axios.post("http://localhost:5000/api/results", {
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
        });

        if (resp.status === 200) {
          setSaveStatus("✅ Auto-saved results to server");
          console.log("Results pushed successfully:", resp.data);
        } else {
          setSaveStatus("❌ Failed to auto-save results");
          console.warn("Unexpected response:", resp);
        }
      } catch (error) {
        console.error("Error saving results:", error);
        setSaveStatus("❌ Failed to auto-save results");
      }
    };

    pushResults();
  }, [
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

  // ✅ Manual Save Button
  const handleSaveResults = async () => {
    try {
      const resp = await axios.post("http://localhost:5000/api/results", {
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
      });

      if (resp.status === 200) {
        setSaveStatus("✅ Results saved successfully!");
        // 🧹 Clear only the result keys
        localStorage.removeItem("readScore");
        localStorage.removeItem("readTime");
        localStorage.removeItem("visualScore");
        localStorage.removeItem("visualTime");
        localStorage.removeItem("audioScore");
        localStorage.removeItem("audioTime");
        localStorage.removeItem("kinestheticScore");
        localStorage.removeItem("kinestheticTime");
      } else {
        setSaveStatus("❌ Failed to save results.");
      }
    } catch (error) {
      console.error("Error saving results:", error);
      setSaveStatus("⚠️ Error saving results.");
    }
  };

  return (
    <ResultContainer>
      <h1>Your Final Result</h1>

      <p>📖 Read Score: {readScore} (Time: {readTime}s)</p>
      <p>🖼️ Visual Score: {visualScore} (Time: {visualTime}s)</p>
      <p>🔊 Audio Score: {audioScore} (Time: {audioTime}s)</p>
      <p>🧩 Kinesthetic Score: {kinestheticScore} (Time: {kinestheticTime}s)</p>

      <h2>🎯 Predicted Learning Style: {predictedStyle} Learner</h2>

      {saveStatus && <p>{saveStatus}</p>}

      <SubmitButton onClick={handleSaveResults}>Save Results</SubmitButton>
      <SubmitButton onClick={() => navigate("/home")}>Return Home</SubmitButton>
    </ResultContainer>
  );
};

export default Result;
