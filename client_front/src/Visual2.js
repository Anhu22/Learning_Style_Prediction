import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 50px;
  padding: 20px;
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 20px;
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #45a049;
  }
`;

const TimerDisplay = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 15px;
  border-radius: 8px;
`;

const PartsOfPlantsPage = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    // Update current start time for cumulative timing
    const currentTime = Date.now();
    localStorage.setItem("visualCurrentStartTime", currentTime.toString());
    
    // Get section start time from localStorage
    const sectionStartTime = parseInt(localStorage.getItem("visualSectionStartTime") || Date.now());
    
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

  return (
    <Wrapper>
      <Title>
        <h1>Welcome to the Parts of Plants!</h1>
      </Title>

      <TimerDisplay>
        ⏱️ Section Time: {formatTime(elapsedTime)}
      </TimerDisplay>

      <VideoContainer>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ql6OL7_qFgU"
          title="Parts of a Plant and Their Functions | Happy Learning English"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </VideoContainer>

      <ButtonContainer>
        <Link to="/vquiz2">
          <Button>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default PartsOfPlantsPage;