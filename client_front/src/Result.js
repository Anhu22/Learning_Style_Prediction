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

  // ✅ Fetch scores & times from localStorage
  const readScore = parseInt(localStorage.getItem("readwriteTotalScore")) || 0;
  const visualScore = parseInt(localStorage.getItem("visualTotalScore")) || 0;
  const audioScore = parseInt(localStorage.getItem("audioTotalScore")) || 0;
  const kinestheticScore = parseInt(localStorage.getItem("kinestheticTotalScore")) || 0;

  const readTime = parseInt(localStorage.getItem("readwriteTotalTime")) || 0;
  const visualTime = parseInt(localStorage.getItem("visualTotalTime")) || 0;
  const audioTime = parseInt(localStorage.getItem("audioTotalTime")) || 0;
  const kinestheticTime = parseInt(localStorage.getItem("kinestheticTotalTime")) || 0;

  // ✅ Get user info
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const schoolname = user.schoolname || "";
  const rollno = user.rollno || "";

  // ✅ Get self-assessed learner type
  //const selfAssessedLearnerType = localStorage.getItem("selfAssessedLearnerType") || "";

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

  // ✅ Elastic IP of your backend
  const BACKEND_URL = "https://learningstyleapp.ddns.net/api/results"; // replace <YOUR_ELASTIC_IP> with actual IP

  // ✅ Auto-save on component mount
  useEffect(() => {
    if (!schoolname || !rollno) {
      setSaveStatus("⚠️ Login required to save results");
      return;
    }

    const pushResults = async () => {
      try {
        const resp = await axios.post(BACKEND_URL, {
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
          //selfAssessedLearnerType
        });

        if (resp.status === 200) {
          setSaveStatus("✅ Auto-saved results to server");
          console.log("Results pushed successfully:", resp.data);
        } else {
          setSaveStatus("❌ Failed to auto-save results");
          console.warn("Unexpected response:", resp);
        }
      } catch (err) {
        console.error("Error saving results:", err);
        setSaveStatus("❌ Failed to auto-save results");
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
    //selfAssessedLearnerType,
  ]);

  // ✅ Manual save button
  const handleSaveResults = async () => {
    try {
      const resp = await axios.post(BACKEND_URL, {
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
        //selfAssessedLearnerType,
      });

      if (resp.status === 200) {
        setSaveStatus("✅ Results saved successfully!");
        // Clear only the result keys
        localStorage.removeItem("readwriteTotalScore");
        localStorage.removeItem("readwriteTotalTime");
        localStorage.removeItem("visualTotalScore");
        localStorage.removeItem("visualTotalTime");
        localStorage.removeItem("audioTotalScore");
        localStorage.removeItem("audioTotalTime");
        localStorage.removeItem("kinestheticTotalScore");
        localStorage.removeItem("kinestheticTotalTime");
      } else {
        setSaveStatus("❌ Failed to save results");
      }
    } catch (err) {
      console.error("Error saving results:", err);
      setSaveStatus("⚠️ Error saving results");
    }
  };

  return (
    <ResultContainer>
      <h1>Your Final Result</h1>

      <p>📖 Read Score: {readScore} (Time: {readTime}s)</p>
      <p>🖼️ Visual Score: {visualScore} (Time: {visualTime}s)</p>
      <p>🔊 Audio Score: {audioScore} (Time: {audioTime}s)</p>
      <p>🧩 Kinesthetic Score: {kinestheticScore} (Time: {kinestheticTime}s)</p>
        {/*<p>🧠 Your Prefered Learning Style: {selfAssessedLearnerType} Learner</p>*/}

      <h2>🎯 Predicted Learning Style: {predictedStyle} Learner</h2>

      

      {saveStatus && <p>{saveStatus}</p>}

      {/*<SubmitButton onClick={handleSaveResults}>Save Results</SubmitButton>*/}
      <SubmitButton onClick={() => navigate("/home")}>Return Home</SubmitButton>
    </ResultContainer>
  );
};

export default Result;