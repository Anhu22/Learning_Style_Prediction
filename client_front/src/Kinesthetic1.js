import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// ------------------ Config ------------------
const BODIES = [
  { 
    id: "sun", 
    name: "Sun", 
    hint: "I'm a big burning star at the center! ☀️",
    fact: "The Sun is a star at the center of our solar system. It's about 4.6 billion years old and makes up 99.86% of the solar system's mass!"
  },
  { 
    id: "mercury", 
    name: "Mercury", 
    hint: "I'm the closest planet to the Sun! 🔥",
    fact: "Mercury is the smallest planet and closest to the Sun. It has no atmosphere and temperatures range from -173°C to 427°C!"
  },
  { 
    id: "venus", 
    name: "Venus", 
    hint: "I'm the hottest planet! 🌋",
    fact: "Venus is the hottest planet with surface temperatures of 465°C. It has a thick atmosphere of carbon dioxide and sulfuric acid clouds!"
  },
  { 
    id: "earth", 
    name: "Earth", 
    hint: "I'm where YOU live! 🌍",
    fact: "Earth is the only known planet with life! It has liquid water, a protective atmosphere, and takes 365.25 days to orbit the Sun!"
  },
  { 
    id: "mars", 
    name: "Mars", 
    hint: "I'm red and dusty! 🔴",
    fact: "Mars is known as the Red Planet due to iron oxide (rust) on its surface. It has the largest volcano in the solar system - Olympus Mons!"
  },
  { 
    id: "jupiter", 
    name: "Jupiter", 
    hint: "I'm the biggest planet! 🌪️",
    fact: "Jupiter is the largest planet - you could fit 1,300 Earths inside it! It has a Great Red Spot, a giant storm that's been raging for centuries!"
  },
  { 
    id: "saturn", 
    name: "Saturn", 
    hint: "I have shiny rings! 💍",
    fact: "Saturn is famous for its spectacular ring system made of ice particles and rock. It's the least dense planet - it would float in water!"
  },
  { 
    id: "uranus", 
    name: "Uranus", 
    hint: "I roll on my side! 🤸",
    fact: "Uranus is tilted on its side at 98 degrees! It has a blue-green color from methane gas and was the first planet discovered with a telescope!"
  },
  { 
    id: "neptune", 
    name: "Neptune", 
    hint: "I'm deep blue and windy! 💨",
    fact: "Neptune has the strongest winds in the solar system - up to 2,100 km/h! It was the first planet located through mathematical calculations!"
  },
];

// ------------------ Styled Components ------------------
const AppWrap = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #1e3c72, #2a5298);
  color: #fff;
  padding: 20px;
  display: flex;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FactsPanel = styled.div`
  width: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-right: 20px;
  backdrop-filter: blur(10px);
  max-height: 80vh;
  overflow-y: auto;
`;

const FactsTitle = styled.h3`
  color: #ffd166;
  text-align: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #ffd166;
  padding-bottom: 8px;
`;

const FactItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 12px;
  border-left: 4px solid ${props => props.color || '#ffd166'};
  
  h4 {
    margin: 0 0 8px 0;
    color: ${props => props.color || '#ffd166'};
  }
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  color: #ffd166;
  text-shadow: 2px 2px 6px #000;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  color: #a8dadc;
  margin-bottom: 20px;
  text-align: center;
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

const ScoreDisplay = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  margin: 15px 0;
  text-align: center;
`;

const TutorialOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const TutorialPopup = styled.div`
  background: linear-gradient(135deg, #2a5298, #1e3c72);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  text-align: center;
  border: 3px solid #ffd166;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const TutorialText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 25px;
  color: #fff;
`;

const TutorialButton = styled(Button)`
  background: #ff6b6b;
  font-size: 18px;
  padding: 12px 30px;
  
  &:hover {
    background: #ff5252;
  }
`;

// Colors + glow for planets & Sun
const bodyStyles = {
  sun: { bg: "radial-gradient(circle, #ffdd00, #ff8800)", glow: "#ffdd00", color: "#ffdd00" },
  mercury: { bg: "radial-gradient(circle, #b3b3b3, #6e6e6e)", glow: "#cfcfcf", color: "#cfcfcf" },
  venus: { bg: "radial-gradient(circle, #f4a261, #b3541e)", glow: "#f4a261", color: "#f4a261" },
  earth: { bg: "radial-gradient(circle, #2a9d8f, #264653)", glow: "#2a9d8f", color: "#2a9d8f" },
  mars: { bg: "radial-gradient(circle, #e63946, #6d1b22)", glow: "#e63946", color: "#e63946" },
  jupiter: { bg: "radial-gradient(circle, #f77f00, #9d4d00)", glow: "#f77f00", color: "#f77f00" },
  saturn: { bg: "radial-gradient(circle, #ffba08, #9a6c00)", glow: "#ffba08", color: "#ffba08" },
  uranus: { bg: "radial-gradient(circle, #48cae4, #0077b6)", glow: "#48cae4", color: "#48cae4" },
  neptune: { bg: "radial-gradient(circle, #4361ee, #1a237e)", glow: "#4361ee", color: "#4361ee" },
};

// Tutorial steps
const TUTORIAL_STEPS = [
  {
    id: 1,
    text: "Welcome to Space Explorer Practice! 🌟 On the left, you'll find interesting facts about each celestial body in our solar system.",
    target: null
  },
  {
    id: 2,
    text: "Click the 'Start Practice' button to begin your first mission. You'll need to drag the correct celestial body to the drop zone!",
    target: "start-button"
  },
  {
    id: 3,
    text: "This is the drop zone! When you get a mission hint, drag the correct planet or sun here to complete the mission.",
    target: "drop-zone"
  },
  {
    id: 4,
    text: "These are all the celestial bodies you can drag. Each has unique characteristics - use the hints to find the right one!",
    target: "planets-container"
  },
  {
    id: 5,
    text: "The score display shows your progress and current score. You'll earn 2 points for each correct answer!",
    target: "score-display"
  },
  {
    id: 6,
    text: "After completing all missions, you can take the quiz to test your knowledge or play again for more practice!",
    target: "end-buttons"
  }
];

// ------------------ Main Component ------------------
const Kinesthetic2Enhanced = () => {
  useEffect(() => {
    const chosenSection = localStorage.getItem("chosenSection");
    if (chosenSection) {
      localStorage.setItem(`${chosenSection}StartTime`, Date.now());
    }
  }, []);

  const [target, setTarget] = useState(null);
  const [scores, setScores] = useState([]);
  const [missionCount, setMissionCount] = useState(0);
  const [usedBodies, setUsedBodies] = useState([]); // Track used celestial bodies
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const navigate = useNavigate();
  const TOTAL_MISSIONS = 5;

  function nextMission() {
    if (missionCount < TOTAL_MISSIONS) {
      // Get available bodies that haven't been used yet
      const availableBodies = BODIES.filter(body => !usedBodies.includes(body.id));
      
      if (availableBodies.length === 0) {
        // If all bodies have been used, reset the used list
        setUsedBodies([]);
        const pick = BODIES[Math.floor(Math.random() * BODIES.length)];
        setTarget(pick);
        setUsedBodies(prev => [...prev, pick.id]);
      } else {
        const pick = availableBodies[Math.floor(Math.random() * availableBodies.length)];
        setTarget(pick);
        setUsedBodies(prev => [...prev, pick.id]);
      }
      setShowInstructions(false);
    } else {
      setTarget(null);
    }
  }

  function handleSkip() {
    // Set score to 0 for skipped mission
    const missionNumber = missionCount + 1;
    localStorage.setItem(`spaceExplorerScore_M${missionNumber}`, 0);
    
    setScores((prev) => [...prev, 0]);
    setMissionCount(missionNumber);
    
    if (missionNumber < TOTAL_MISSIONS) {
      setTimeout(nextMission, 500); // Brief pause before next mission
    } else {
      setTarget(null);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const bodyId = e.dataTransfer.getData("body");
    const body = BODIES.find((b) => b.id === bodyId);

    if (!body || !target) return;

    const isCorrect = body.id === target.id;
    const points = isCorrect ? 2 : 0;

    const missionNumber = missionCount + 1;
    localStorage.setItem(`spaceExplorerScore_M${missionNumber}`, points);

    setScores((prev) => [...prev, points]);
    setMissionCount(missionNumber);

    const totalScore = scores.reduce((sum, score) => sum + score, 0) + points;
    localStorage.setItem("kinesthetictotalscore", totalScore);

    if (missionNumber < TOTAL_MISSIONS) {
      setTimeout(nextMission, 1000); // Brief pause before next mission
    } else {
      setTarget(null);
    }
  }

  function resetGame() {
    setTarget(null);
    setScores([]);
    setMissionCount(0);
    setShowInstructions(true);
    setShowTutorial(true);
    setCurrentTutorialStep(0);
  }

  function nextTutorialStep() {
    if (currentTutorialStep < TUTORIAL_STEPS.length - 1) {
      setCurrentTutorialStep(prev => prev + 1);
    } else {
      setShowTutorial(false);
    }
  }

  const currentScore = scores.reduce((sum, score) => sum + score, 0);
  const maxScore = TOTAL_MISSIONS * 2;

  return (
    <AppWrap>
      {/* Facts Panel on the left */}
      <FactsPanel>
        <FactsTitle>🌌 Solar System Facts</FactsTitle>
        {BODIES.map((body) => (
          <FactItem key={body.id} color={bodyStyles[body.id].color}>
            <h4>{body.name}</h4>
            <p>{body.fact}</p>
          </FactItem>
        ))}
      </FactsPanel>

      <MainContent>
        <Title>🌞🪐 Space Explorer Practice</Title>
        <Subtitle>Drag and drop the correct celestial body to complete each mission!</Subtitle>

        {showInstructions && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '20px', 
            borderRadius: '10px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <h3>How to Play:</h3>
            <p>1. Click "Start Practice" to begin</p>
            <p>2. Read the hint for each mission</p>
            <p>3. Drag the correct celestial body to the drop zone</p>
            <p>4. Complete all 5 missions to finish the practice</p>
          </div>
        )}

        {missionCount > 0 && (
          <ScoreDisplay id="score-display">
            <strong>Progress:</strong> Mission {missionCount} of {TOTAL_MISSIONS} | 
            <strong> Score:</strong> {currentScore}/{maxScore}
          </ScoreDisplay>
        )}

        {missionCount < TOTAL_MISSIONS ? (
          <Button 
            onClick={nextMission} 
            id="start-button"
            style={currentTutorialStep === 1 ? { 
              boxShadow: '0 0 20px #ffd166, 0 0 30px #ffd166',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease'
            } : {}}
          >
            {missionCount === 0 ? "🚀 Start Practice" : "➡️ Next Mission"}
          </Button>
        ) : (
          <div id="end-buttons">
            <Button onClick={() => navigate("/kinesthetic_Quiz1")}>
              Take the Quiz
            </Button>
            <Button onClick={resetGame} style={{ background: '#e63946' }}>
              Play Again
            </Button>
          </div>
        )}

        {target && missionCount < TOTAL_MISSIONS && (
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <p style={{ fontSize: "18px", marginBottom: '10px' }}>
              <strong>Mission {missionCount + 1}:</strong> {target.hint}
            </p>
            {/*<Button 
              onClick={handleSkip}
              style={{ 
                background: '#f44336',
                fontSize: '14px',
                padding: '8px 16px'
              }}
            >
              Skip Mission ⏭️
            </Button>*/}
          </div>
        )}

        {/* Answer Drop Box */}
        {missionCount < TOTAL_MISSIONS && (
          <AnswerBox
            id="drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            style={currentTutorialStep === 2 ? { 
              boxShadow: '0 0 20px #ffb703, 0 0 30px #ffb703',
              border: '3px solid #ffd166',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            } : {}}
          >
            {target ? "👉 Drag the correct one here!" : "Press Start to begin 🚀"}
          </AnswerBox>
        )}

        {/* Planets & Sun to Drag */}
        {missionCount < TOTAL_MISSIONS && (
          <BodyContainer 
            id="planets-container"
            style={currentTutorialStep === 3 ? { 
              outline: '3px solid #ffd166',
              borderRadius: '15px',
              padding: '10px',
              boxShadow: '0 0 20px rgba(255, 209, 102, 0.5)'
            } : {}}
          >
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

        {missionCount === TOTAL_MISSIONS && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3 style={{ color: '#ffd166' }}>🎉 Practice Complete! 🎉</h3>
            <p>You scored {currentScore} out of {maxScore} points!</p>
            <p>Ready to test your knowledge in the quiz?</p>
          </div>
        )}

        {/* Tutorial Popup */}
        {showTutorial && (
          <TutorialOverlay>
            <TutorialPopup>
              <TutorialText>
                {TUTORIAL_STEPS[currentTutorialStep].text}
              </TutorialText>
              <TutorialButton onClick={nextTutorialStep}>
                {currentTutorialStep === TUTORIAL_STEPS.length - 1 ? "Got it! Let's Start" : "Next"}
              </TutorialButton>
            </TutorialPopup>
          </TutorialOverlay>
        )}
      </MainContent>
    </AppWrap>
  );
};

export default Kinesthetic2Enhanced;
