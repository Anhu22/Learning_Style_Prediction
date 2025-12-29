import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// ------------------ Config ------------------
const BODIES = [
  { id: "sun", name: "Sun", hint: "I'm a big burning star at the center! ☀️" },
  { id: "mercury", name: "Mercury", hint: "I'm the closest planet to the Sun! 🔥" },
  { id: "venus", name: "Venus", hint: "I'm the hottest planet! 🌋" },
  { id: "earth", name: "Earth", hint: "I'm where YOU live! 🌍" },
  { id: "mars", name: "Mars", hint: "I'm red and dusty! 🔴" },
  { id: "jupiter", name: "Jupiter", hint: "I'm the biggest planet! 🌪️" },
  { id: "saturn", name: "Saturn", hint: "I have shiny rings! 💍" },
  { id: "uranus", name: "Uranus", hint: "I roll on my side! 🤸" },
  { id: "neptune", name: "Neptune", hint: "I'm deep blue and windy! 💨" },
];

// ------------------ Styled Components ------------------
const AppWrap = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #1e3c72, #2a5298);
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #ffd166;
  text-shadow: 2px 2px 6px #000;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 20px;
  justify-content: center;
`;

const PlanetCard = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${(props) => props.bg};
  box-shadow: inset -6px -6px 12px rgba(0,0,0,0.4),
              inset 6px 6px 12px rgba(255,255,255,0.2),
              0px 0px 20px ${(props) => props.glow};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  cursor: grab;
  user-select: none;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.15);
  }
`;

const AnswerBox = styled.div`
  width: 320px;
  min-height: 120px;
  border: 3px dashed #ffb703;
  border-radius: 16px;
  background: #fffbea;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  font-size: 18px;
  text-align: center;
  padding: 10px;
  color: #000;
`;

const Button = styled.button`
  background: #ffd166;
  border: none;
  color: #000;
  font-weight: bold;
  padding: 10px 22px;
  border-radius: 14px;
  cursor: pointer;
  margin: 10px;
  font-size: 16px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.4);

  &:hover {
    background: #ffb703;
  }
`;

const TimerDisplay = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #ffd166;
  margin: 10px 0;
  text-shadow: 1px 1px 3px #000;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px 15px;
  border-radius: 10px;
`;

// Colors + glow for planets & Sun
const bodyStyles = {
  sun: { bg: "radial-gradient(circle, #ffdd00, #ff8800)", glow: "#ffdd00" },
  mercury: { bg: "radial-gradient(circle, #b3b3b3, #6e6e6e)", glow: "#cfcfcf" },
  venus: { bg: "radial-gradient(circle, #f4a261, #b3541e)", glow: "#f4a261" },
  earth: { bg: "radial-gradient(circle, #2a9d8f, #264653)", glow: "#2a9d8f" },
  mars: { bg: "radial-gradient(circle, #e63946, #6d1b22)", glow: "#e63946" },
  jupiter: { bg: "radial-gradient(circle, #f77f00, #9d4d00)", glow: "#f77f00" },
  saturn: { bg: "radial-gradient(circle, #ffba08, #9a6c00)", glow: "#ffba08" },
  uranus: { bg: "radial-gradient(circle, #48cae4, #0077b6)", glow: "#48cae4" },
  neptune: { bg: "radial-gradient(circle, #4361ee, #1a237e)", glow: "#4361ee" },
};

// ------------------ Main Component ------------------
export default function SpaceExplorerGame() {
  const [target, setTarget] = useState(null);
  const [missionCount, setMissionCount] = useState(0);
  const [usedBodies, setUsedBodies] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const navigate = useNavigate();
  const TOTAL_MISSIONS = 5;

  // Timer
  useEffect(() => {
    // Get section start time from localStorage
    const sectionStartTime = parseInt(localStorage.getItem("kinestheticSectionStartTime") || Date.now());
    
    // Calculate initial elapsed time
    const initialElapsed = Math.floor((Date.now() - sectionStartTime) / 1000);
    setElapsedTime(initialElapsed);
    
    // Start updating timer every second
    const interval = setInterval(() => {
      const currentElapsed = Math.floor((Date.now() - sectionStartTime) / 1000);
      setElapsedTime(currentElapsed);
    }, 1000);
    
    setTimerInterval(interval);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pick next mission
  function nextMission() {
    if (missionCount < TOTAL_MISSIONS) {
      const availableBodies = BODIES.filter(
        (body) => !usedBodies.includes(body.id)
      );

      if (availableBodies.length === 0) {
        setUsedBodies([]);
        const pick = BODIES[Math.floor(Math.random() * BODIES.length)];
        setTarget(pick);
        setUsedBodies((prev) => [...prev, pick.id]);
      } else {
        const pick =
          availableBodies[Math.floor(Math.random() * availableBodies.length)];
        setTarget(pick);
        setUsedBodies((prev) => [...prev, pick.id]);
      }
    } else {
      setTarget(null);
      navigate("/kinesthetic2");
    }
  }

  // Handle drop
  function handleDrop(e) {
    e.preventDefault();
    const bodyId = e.dataTransfer.getData("body");
    const body = BODIES.find((b) => b.id === bodyId);

    if (!body || !target) return;

    const isCorrect = body.id === target.id;
    const points = isCorrect ? 1 : 0;

    const missionNumber = missionCount + 1;
    localStorage.setItem(`spaceExplorerScore_M${missionNumber}`, points);

    // compute new total from existing stored values plus this points
    let totalScore = 0;
    for (let i = 1; i <= missionNumber; i++) {
      totalScore += parseInt(localStorage.getItem(`spaceExplorerScore_M${i}`)) || 0;
    }
    localStorage.setItem("kinesthetictotalscore", totalScore.toString());
    
    // Save ONLY the score (remove time storage)
    localStorage.setItem("kinestheticQuizScore1", totalScore.toString());

    setMissionCount(missionNumber);

    if (missionNumber < TOTAL_MISSIONS) {
      nextMission();
    } else {
      // Quiz finished normally
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      setTarget(null);
      navigate("/kinesthetic2");
    }
  }

  return (
    <AppWrap>
      <Title>🌞🪐 Space Explorer Game</Title>
      
      <TimerDisplay>
        ⏱️ Section Time: {formatTime(elapsedTime)}
      </TimerDisplay>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {missionCount < TOTAL_MISSIONS ? (
          <Button onClick={nextMission}>
            {missionCount === 0 ? "🌟 Start Mission" : "➡️ Next Mission"}
          </Button>
        ) : (
          <Button onClick={() => navigate("/kinesthetic2")}>
            Proceed to Next
          </Button>
        )}
      </div>

      {target && missionCount < TOTAL_MISSIONS && (
        <p style={{ fontSize: "18px", marginTop: "10px" }}>
          <strong>Mission {missionCount + 1}:</strong> {target.hint}
        </p>
      )}

      {missionCount < TOTAL_MISSIONS && (
        <AnswerBox onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          {target ? "👉 Drag the correct one here!" : "Press Start to begin 🚀"}
        </AnswerBox>
      )}

      {missionCount < TOTAL_MISSIONS && (
        <BodyContainer>
          {BODIES.map((b) => (
            <PlanetCard
              key={b.id}
              draggable
              bg={bodyStyles[b.id].bg}
              glow={bodyStyles[b.id].glow}
              onDragStart={(e) => e.dataTransfer.setData("body", b.id)}
            >
              {b.name}
            </PlanetCard>
          ))}
        </BodyContainer>
      )}
    </AppWrap>
  );
}