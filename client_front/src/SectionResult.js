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
  transition: background-color 0.3s;

  &:hover {
    background-color: #e55347;
  }
`;

const SectionResult = () => {
  const navigate = useNavigate();
  const chosenSection = localStorage.getItem("chosenSection");
  const [flowTimeTaken, setFlowTimeTaken] = useState("");

  useEffect(() => {
    if (!chosenSection) return;

    // ⏱️ Calculate total time for the flow
    const flowStartTime = localStorage.getItem(`${chosenSection}StartTime`);
    if (flowStartTime) {
      const endTime = Date.now();
      const durationMs = endTime - parseInt(flowStartTime, 10);
      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);
      setFlowTimeTaken(`${minutes}m ${seconds}s`);
      localStorage.setItem(`${chosenSection}FlowDuration`, durationMs.toString());
    }

    // 🧮 Calculate total score and total time for this section
    const score1 = parseInt(localStorage.getItem(`${chosenSection}QuizScore1`) || "0", 10);
    const score2 = parseInt(localStorage.getItem(`${chosenSection}QuizScore2`) || "0", 10);
    const score3 = parseInt(localStorage.getItem(`${chosenSection}QuizScore3`) || "0", 10);
    const totalScore = score1 + score2 + score3;

    const time1 = parseInt(localStorage.getItem(`${chosenSection}QuizTime1`) || "0", 10);
    const time2 = parseInt(localStorage.getItem(`${chosenSection}QuizTime2`) || "0", 10);
    const time3 = parseInt(localStorage.getItem(`${chosenSection}QuizTime3`) || "0", 10);
    const totalTime = time1 + time2 + time3;

    // 💾 Save the final result for this section
    localStorage.setItem(`${chosenSection}TotalScore`, totalScore.toString());
    localStorage.setItem(`${chosenSection}TotalTime`, totalTime.toString());
    // Special-case: Result.js expects read totals under readTotalScore/readTotalTime
    if (chosenSection === 'readwrite') {
      localStorage.setItem('readTotalScore', totalScore.toString());
      localStorage.setItem('readTotalTime', totalTime.toString());
    }

    // 💾 Also save global "final" results for backend sync
    localStorage.setItem("finalScore", totalScore.toString());
    localStorage.setItem("finalTime", totalTime.toString());
    localStorage.setItem("lastSection", chosenSection);

    // 📤 Send section results to backend
    const saveSectionResults = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")) || {};
        const { schoolname, rollno } = user;

        if (!rollno) {
          console.warn("No user logged in, skipping save to DB");
          return;
        }

        // Map section to field names
        const fieldMap = {
          read: { score: "readWriteScore", time: "readWriteTime" },
          visual: { score: "visualScore", time: "visualTime" },
          audio: { score: "audioScore", time: "audioTime" },
          kinesthetic: { score: "kinestheticScore", time: "kinestheticTime" },
        };

        const fields = fieldMap[chosenSection];
        if (!fields) {
          console.error(`Unknown section: ${chosenSection}`);
          return;
        }

        const data = {
          schoolname,
          rollno,
          [fields.score]: totalScore,
          [fields.time]: totalTime,
        };

        const response = await axios.post("http://localhost:5000/api/results", data);
        console.log("Section results saved:", response.data);
      } catch (error) {
        console.error("Failed to save section results:", error);
      }
    };

    saveSectionResults();
  }, [chosenSection]);

  if (!chosenSection) {
    return (
      <ResultContainer>
        <h1>No section chosen</h1>
        <SubmitButton onClick={() => navigate("/choose")}>
          Choose a Quiz Section
        </SubmitButton>
      </ResultContainer>
    );
  }

  // Capitalize first letter for display
  const displaySection = chosenSection.charAt(0).toUpperCase() + chosenSection.slice(1);

  const totalScore = localStorage.getItem(`${chosenSection}TotalScore`) || 0;
  localStorage.setItem(`${chosenSection}TotalScore`, totalScore.toString());

  const totalTime = localStorage.getItem(`${chosenSection}TotalTime`) || 0;
  localStorage.setItem(`${chosenSection}TotalTime`, totalTime.toString());


  return (
    <ResultContainer>
      <h1>{displaySection} Quiz Result</h1>
      <p>Score: {totalScore}</p>
      {flowTimeTaken && <p>Total Time for Flow: {flowTimeTaken}</p>}
      <SubmitButton onClick={() => navigate("/choose")}>
        Take Other Quizzes
      </SubmitButton>
    </ResultContainer>
  );
};

export default SectionResult;
