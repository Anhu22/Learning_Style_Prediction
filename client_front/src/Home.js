import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg,rgb(166, 243, 243),rgb(244, 180, 250));
`;


const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const StartButton = styled.button`
  padding: 12px 30px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }
`;

const LoginButton = styled.button`
  padding: 8px 20px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    const quizzes = ["/choose"];
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    navigate(randomQuiz);
  };

  return (
    <Wrapper>
      {/*<LoginButton onClick={() => navigate('/login')}>Login / Register</LoginButton>*/}
      <Title>
        Welcome
        <br />
        Wanna Know Your Learning Style??
        <br />
        Let's Start with an Interesting Questionnaire
        <br />
      </Title>
      <StartButton onClick={handleStart}>Start</StartButton>
    </Wrapper>
  );
};

export default LandingPage;
