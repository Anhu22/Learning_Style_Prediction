import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  min-height: 100vh;
`;

const Title = styled.div`
  margin: 20px;
  padding: 20px;
  text-align: center;
`;

const FormContainer = styled.div`
  margin: 30px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0);
`;

const Label = styled.label`
  display: block;
  margin: 15px 0;
  font-size: 18px;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
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

const SelfAssessment = () => {
  const navigate = useNavigate();
  const [learnerType, setLearnerType] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (learnerType) {
      localStorage.setItem("selfAssessedLearnerType", learnerType);

      // Get user info
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const schoolname = user.schoolname || "";
      const rollno = user.rollno || "";

      if (schoolname && rollno) {
        try {
          const BACKEND_URL = "http://3.105.202.209:5000/api/results";
          const resp = await axios.post(BACKEND_URL, {
            schoolname,
            rollno,
            selfAssessedLearnerType: learnerType,
          });

          if (resp.status === 200) {
            setSaveStatus("✅ Self-assessment saved to server");
          } else {
            setSaveStatus("❌ Failed to save self-assessment");
          }
        } catch (err) {
          console.error("Error saving self-assessment:", err);
          setSaveStatus("❌ Failed to save self-assessment");
        }
      }

      // Navigate to result page after self-assessment
      navigate("/result");
    }
  };

  return (
    <Container>
      <Title>
        <h1>Self Assessment</h1>
        <p>What type of learner do you think you are?</p>
      </Title>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="learnerType">Select your learner type:</Label>
          <Select
            id="learnerType"
            value={learnerType}
            onChange={(e) => setLearnerType(e.target.value)}
            required
          >
            <option value="">-- Choose an option --</option>
            <option value="visual">Visual Learner</option>
            <option value="audio">Audio Learner</option>
            <option value="readwrite">Read/Write Learner</option>
            <option value="kinesthetic">Kinesthetic Learner</option>
          </Select>
          <SubmitButton type="submit">Submit</SubmitButton>
          {saveStatus && <p style={{ textAlign: 'center', marginTop: '10px' }}>{saveStatus}</p>}
        </form>
      </FormContainer>
    </Container>
  );
};

export default SelfAssessment;
