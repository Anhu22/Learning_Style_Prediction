import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const Question = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
  text-align: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
`;

const OptionButton = styled.button`
  padding: 15px;
  font-size: 18px;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    background-color: #f0f0f0;
    border-color: #4caf50;
  }

  &.selected {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  }
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  padding: 12px 24px;
  font-size: 18px;
  background-color: #ff7f50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e96b3a;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SelfAssessment = () => {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const learningStyles = [
    "Visual",
    "Auditory",
    "Read/Write",
    "Kinesthetic"
  ];

  const handleSelect = (style) => {
    setSelectedStyle(style);
  };

  const handleSubmit = async () => {
    if (!selectedStyle) {
      setSaveStatus("Please select a learning style.");
      return;
    }

    // Store in localStorage for display on results page
    localStorage.setItem("selfAssessedLearnerType", selectedStyle);

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const schoolname = user.schoolname || "";
    const rollno = user.rollno || "";

    if (!schoolname || !rollno) {
      setSaveStatus("⚠️ Login required to save results");
      return;
    }

    const BACKEND_URL = "http://3.105.202.209:5000/api/results";

    try {
      const resp = await axios.post(BACKEND_URL, {
        schoolname,
        rollno,
        selfAssessedLearnerType: selectedStyle,
      });

      if (resp.status === 200) {
        navigate("/result");
      } else {
        setSaveStatus("❌ Failed to save self-assessment");
      }
    } catch (err) {
      console.error("Error saving self-assessment:", err);
      setSaveStatus("❌ Failed to save self-assessment");
    }
  };

  return (
    <Container>
      <Title>Self-Assessment</Title>
      <Question>What type of learner do you think you are?</Question>
      <OptionsContainer>
        {learningStyles.map((style) => (
          <OptionButton
            key={style}
            className={selectedStyle === style ? "selected" : ""}
            onClick={() => handleSelect(style)}
          >
            {style} Learner
          </OptionButton>
        ))}
      </OptionsContainer>
      <SubmitButton onClick={handleSubmit} disabled={!selectedStyle}>
        Submit
      </SubmitButton>
      {saveStatus && <p style={{ marginTop: "20px", fontSize: "16px" }}>{saveStatus}</p>}
    </Container>
  );
};

export default SelfAssessment;
