import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
`;

const Title = styled.div`
  margin: 20px;
  padding: 20px;
  text-align: center;
`;

const FinishButton = styled.button`
  margin: 20px auto;
  display: block;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const BoxContainer = styled.div`
  margin: 30px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0);
`;

const Box = styled.div`
  margin: 30px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
  }
`;

const CheckboxContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #4caf50;
  cursor: not-allowed;
`;

const CompletionBadge = styled.div`
  background: ${(props) => (props.completed ? "#4caf50" : "#ccc")};
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;

const Choose = () => {
  const navigate = useNavigate();
  const [completedSections, setCompletedSections] = useState({
    visual: false,
    audio: false,
    readwrite: false,
    kinesthetic: false,
  });

  const checkSectionCompletion = (section) => {
    // consider all three quizzes for the section — if any quiz has a score or time, mark section completed
    const score1 = parseInt(localStorage.getItem(`${section}QuizScore1`) || "0", 10);
    const score2 = parseInt(localStorage.getItem(`${section}QuizScore2`) || "0", 10);
    const score3 = parseInt(localStorage.getItem(`${section}QuizScore3`) || "0", 10);
    const time1 = parseInt(localStorage.getItem(`${section}QuizTime1`) || "0", 10);
    const time2 = parseInt(localStorage.getItem(`${section}QuizTime2`) || "0", 10);
    const time3 = parseInt(localStorage.getItem(`${section}QuizTime3`) || "0", 10);

    const totalScore = score1 + score2 + score3;
    const totalTime = time1 + time2 + time3;
    return totalScore > 0 || totalTime > 0;
  };

  useEffect(() => {
    const sections = ["visual", "audio", "readwrite", "kinesthetic"];
    const updatedCompletedSections = {};

    sections.forEach((section) => {
      updatedCompletedSections[section] = checkSectionCompletion(section);
    });

    setCompletedSections(updatedCompletedSections);
  }, []);

  return (
    <Container>
      <Title>
        <h1>Do you know your Learning Style</h1>
        <p>Choose One to get started</p>
      </Title>
      <BoxContainer>
        {/* Visual */}
        <Box
          style={{ background: "rgb(244, 180, 250)" }}
          disabled={completedSections.visual}
          onClick={() => {
            if (!completedSections.visual) {
              localStorage.setItem("chosenSection", "visual");
              navigate("/visual1");
            }
          }}
        >
          <CheckboxContainer>
            <CompletionBadge completed={completedSections.visual}>
            </CompletionBadge>
          </CheckboxContainer>
          Visual Learner
        </Box>

        {/* Audio */}
        <Box
          style={{ background: "rgb(244, 180, 250)" }}
          disabled={completedSections.audio}
          onClick={() => {
            if (!completedSections.audio) {
              localStorage.setItem("chosenSection", "audio");
              navigate("/audio1");
            }
          }}
        >
          <CheckboxContainer>
            <CompletionBadge completed={completedSections.audio}>
            </CompletionBadge>
          </CheckboxContainer>
          Audio Learner
        </Box>

        {/* Read/Write */}
        <Box
          style={{ background: "rgb(244, 180, 250)" }}
          disabled={completedSections.readwrite}
          onClick={() => {
            if (!completedSections.readwrite) {
              localStorage.setItem("chosenSection", "readwrite");
              navigate("/readwrite1");
            }
          }}
        >
          <CheckboxContainer>
            
            <CompletionBadge completed={completedSections.readwrite}>
            </CompletionBadge>
          </CheckboxContainer>
          Read/Write Learner
        </Box>

        {/* Kinesthetic */}
        <Box
          style={{ background: "rgb(244, 180, 250)" }}
          disabled={completedSections.kinesthetic}
          onClick={() => {
            if (!completedSections.kinesthetic) {
              localStorage.setItem("chosenSection", "kinesthetic");
              navigate("/kinesthetic1");
            }
          }}
        >
          <CheckboxContainer>
            
            <CompletionBadge completed={completedSections.kinesthetic}>
              
            </CompletionBadge>
          </CheckboxContainer>
          Kinesthetic Learner
        </Box>
      </BoxContainer>
      <FinishButton onClick={() => navigate("/Results")}>
        Finish
      </FinishButton>
    </Container>
  );
};

export default Choose;