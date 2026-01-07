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

const ScoreDisplay = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TimeDisplay = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
  margin: 15px 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
`;

const SectionResult = () => {
  const navigate = useNavigate();
  const chosenSection = localStorage.getItem("chosenSection");
  const [flowTimeTaken, setFlowTimeTaken] = useState("");
  const [flowTimeSeconds, setFlowTimeSeconds] = useState(0);
  const [scores, setScores] = useState({
    quiz1: 0,
    quiz2: 0,
    quiz3: 0,
    total: 0
  });
  const [sectionTime, setSectionTime] = useState(0);

  useEffect(() => {
    if (!chosenSection) return;

    console.log(`Processing results for section: ${chosenSection}`);
    
    // 🧮 Method 1: Calculate TOTAL FLOW TIME from section start
    const flowStartTime = localStorage.getItem(`${chosenSection}SectionStartTime`);
    if (flowStartTime) {
      const endTime = Date.now();
      const durationMs = endTime - parseInt(flowStartTime, 10);
      const durationSeconds = Math.floor(durationMs / 1000);
      const minutes = Math.floor(durationSeconds / 60);
      const seconds = durationSeconds % 60;
      
      setFlowTimeTaken(`${minutes}m ${seconds}s`);
      setFlowTimeSeconds(durationSeconds);
      
      // Store the total flow time
      localStorage.setItem(`${chosenSection}TotalFlowTime`, durationSeconds.toString());
      console.log(`Method 1 - Total Flow Time for ${chosenSection}: ${durationSeconds} seconds (${minutes}m ${seconds}s)`);
    }

    // 🧮 Method 2: Use stored total section time (from quiz 3)
    const storedSectionTime = localStorage.getItem(`${chosenSection}TotalSectionTime`);
    if (storedSectionTime) {
      const totalSeconds = parseInt(storedSectionTime, 10);
      setSectionTime(totalSeconds);
      console.log(`Method 2 - Stored Total Section Time for ${chosenSection}: ${totalSeconds} seconds`);
    }

    // 🧮 Calculate total score for this section
    let score1, score2, score3;
    
    if (chosenSection === "readwrite") {
      score1 = parseInt(localStorage.getItem("readwriteQuizScore1") || "0", 10);
      score2 = parseInt(localStorage.getItem("readwriteQuizScore2") || "0", 10);
      score3 = parseInt(localStorage.getItem("readwriteQuizScore3") || "0", 10);
    } else if (chosenSection === "audio") {
      score1 = parseInt(localStorage.getItem("audioQuizScore1") || "0", 10);
      score2 = parseInt(localStorage.getItem("audioQuizScore2") || "0", 10);
      score3 = parseInt(localStorage.getItem("audioQuizScore3") || "0", 10);
    } else if (chosenSection === "kinesthetic") {
      score1 = parseInt(localStorage.getItem("kinestheticQuizScore1") || "0", 10);
      score2 = parseInt(localStorage.getItem("kinestheticQuizScore2") || "0", 10);
      score3 = parseInt(localStorage.getItem("kinestheticQuizScore3") || "0", 10);
    } else if (chosenSection === "visual") {
      score1 = parseInt(localStorage.getItem("visualQuizScore1") || "0", 10);
      score2 = parseInt(localStorage.getItem("visualQuizScore2") || "0", 10);
      score3 = parseInt(localStorage.getItem("visualQuizScore3") || "0", 10);
    } else {
      score1 = parseInt(localStorage.getItem(`${chosenSection}QuizScore1`) || "0", 10);
      score2 = parseInt(localStorage.getItem(`${chosenSection}QuizScore2`) || "0", 10);
      score3 = parseInt(localStorage.getItem(`${chosenSection}QuizScore3`) || "0", 10);
    }
    
    const totalScore = score1 + score2 + score3;
    
    // Debug logging
    console.log(`${chosenSection} Scores:`, { score1, score2, score3, totalScore });
    
    // Update state for display
    setScores({ quiz1: score1, quiz2: score2, quiz3: score3, total: totalScore });

    // 💾 CRITICAL: Save results in the format that Result.js expects
    // Use the storedSectionTime value directly if available (don't rely on state updates)
    const storedSectionTimeVal = localStorage.getItem(`${chosenSection}TotalSectionTime`);
    const storedSectionTimeNum = storedSectionTimeVal ? parseInt(storedSectionTimeVal, 10) : 0;
    const finalTimeToStore = storedSectionTimeNum > 0 ? storedSectionTimeNum : flowTimeSeconds;

    // Stop the running timer for this section: save an end time and remove the start time key
    if (localStorage.getItem(`${chosenSection}SectionStartTime`)) {
      const recordedEnd = Date.now();
      localStorage.setItem(`${chosenSection}SectionEndTime`, recordedEnd.toString());
      localStorage.removeItem(`${chosenSection}SectionStartTime`);
      console.log(`Stopped timer for ${chosenSection}. End time saved: ${recordedEnd}`);
    }

    // Store using section-specific keys
    localStorage.setItem(`${chosenSection}TotalScore`, totalScore.toString());

    // Store time in BOTH formats for compatibility:
    // 1. New format: [section]TotalFlowTime
    localStorage.setItem(`${chosenSection}TotalFlowTime`, finalTimeToStore.toString());
    // also ensure TotalSectionTime is set (some Quiz3 use this key)
    localStorage.setItem(`${chosenSection}TotalSectionTime`, finalTimeToStore.toString());
    
    // 2. Old format (for Result.js backward compatibility)
    if (chosenSection === "readwrite") {
      localStorage.setItem("readTotalScore", totalScore.toString());
      localStorage.setItem("readTotalTime", finalTimeToStore.toString()); // This is what Result.js looks for
      console.log(`Saved for readwrite: readTotalTime = ${finalTimeToStore}s`);
    } else if (chosenSection === "visual") {
      localStorage.setItem("visualTotalScore", totalScore.toString());
      localStorage.setItem("visualTotalTime", finalTimeToStore.toString()); // This is what Result.js looks for
      console.log(`Saved for visual: visualTotalTime = ${finalTimeToStore}s`);
    } else if (chosenSection === "audio") {
      localStorage.setItem("audioTotalScore", totalScore.toString());
      localStorage.setItem("audioTotalTime", finalTimeToStore.toString()); // This is what Result.js looks for
      console.log(`Saved for audio: audioTotalTime = ${finalTimeToStore}s`);
    } else if (chosenSection === "kinesthetic") {
      localStorage.setItem("kinestheticTotalScore", totalScore.toString());
      localStorage.setItem("kinestheticTotalTime", finalTimeToStore.toString()); // This is what Result.js looks for
      console.log(`Saved for kinesthetic: kinestheticTotalTime = ${finalTimeToStore}s`);
    }

    // 💾 Save global "final" results for backend sync
    localStorage.setItem("finalScore", totalScore.toString());
    localStorage.setItem("finalTime", finalTimeToStore.toString());
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

        // Map section to field names (matching your backend schema)
        const fieldMap = {
          readwrite: { score: "readWriteScore", time: "readWriteTime" },
          visual: { score: "visualScore", time: "visualTime" },
          audio: { score: "audioScore", time: "audioTime" },
          kinesthetic: { score: "kinestheticScore", time: "kinestheticTime" },
        };

        const fields = fieldMap[chosenSection];
        if (!fields) {
          console.error(`Unknown section: ${chosenSection}`);
          return;
        }

        // Send data to backend
        const data = {
          schoolname,
          rollno,
          [fields.score]: totalScore,
          [fields.time]: finalTimeToStore,
        };

        console.log("Sending to backend:", data);
        const response = await axios.post("https://learningstyleapp.ddns.net/api/results", data);
        console.log("Section results saved:", response.data);
      } catch (error) {
        console.error("Failed to save section results:", error);
      }
    };

    saveSectionResults();
  }, [chosenSection]);

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

  // Determine which time to display
  const displayTimeValue = sectionTime > 0 ? sectionTime : flowTimeSeconds;
  const displayTime = formatTime(displayTimeValue);

  return (
    <ResultContainer>
      <h1>{displaySection} Section Results</h1>
      
      <ScoreDisplay>
        <h2>📊 Score Breakdown</h2>
        <p><strong>Quiz 1:</strong> {scores.quiz1}/5</p>
        <p><strong>Quiz 2:</strong> {scores.quiz2}/5</p>
        <p><strong>Quiz 3:</strong> {scores.quiz3}/5</p>
        <hr />
        <h3>🏆 Total Score: {scores.total}/15</h3>
        
        <h2>⏱️ Section Engagement Time</h2>
        <TimeDisplay>
          🕒 Total Time: {displayTime}
        </TimeDisplay>
        {/*<p><em>This includes all content viewing and quiz completion time</em></p>*/}
        
        {/* Display storage info for debugging */}
        <div style={{ 
          fontSize: '12px', 
          color: '#666', 
          marginTop: '10px',
          padding: '5px',
          background: '#f5f5f5',
          borderRadius: '5px'
        }}>
          {/*<p><strong>Storage Debug Info:</strong></p>
          <p>Time stored as: {displayTimeValue}s</p>
          <p>Stored keys for Result.js:</p>
          <ul style={{ textAlign: 'left', margin: '5px 0', paddingLeft: '20px' }}>
            <li>{chosenSection === 'readwrite' ? 'readTotalTime' : `${chosenSection}TotalTime`}: {displayTimeValue}s</li>
            <li>{chosenSection}TotalScore: {scores.total}</li>
          </ul>*/}
        </div>
      </ScoreDisplay>
      
      <SubmitButton onClick={() => navigate("/choose")}>
        Take Other Quizzes
      </SubmitButton>
      
      {/* Debug button */}
      {/*<button 
        onClick={() => {
          console.log("=== LOCALSTORAGE DUMP ===");
          console.log(`Chosen Section: ${chosenSection}`);
          console.log(`Section Start Time: ${localStorage.getItem(`${chosenSection}SectionStartTime`)}`);
          console.log(`Stored Total Time: ${displayTimeValue} seconds (${displayTime})`);
          console.log(`Scores: Quiz1=${scores.quiz1}, Quiz2=${scores.quiz2}, Quiz3=${scores.quiz3}`);
          
          // Show all time-related localStorage items
          console.log("\n=== TIME-RELATED STORAGE ===");
          const timeKeys = [
            'readTotalTime', 'visualTotalTime', 'audioTotalTime', 'kinestheticTotalTime',
            'readwriteTotalFlowTime', 'visualTotalFlowTime', 'audioTotalFlowTime', 'kinestheticTotalFlowTime',
            'finalTime'
          ];
          
          timeKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value) {
              console.log(`${key}: ${value}s`);
            }
          });
        }}
        style={{ 
          marginTop: '10px', 
          background: '#ccc', 
          padding: '5px 10px',
          fontSize: '12px'
        }}
      >
        Debug Storage
      </button>*/}
    </ResultContainer>
  );
};

export default SectionResult;