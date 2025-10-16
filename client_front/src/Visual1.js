import React, { useEffect } from "react";
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

const Home = () => {
  useEffect(() => {
    const chosenSection = localStorage.getItem("chosenSection");
    if (chosenSection) {
      localStorage.setItem(`${chosenSection}StartTime`, Date.now());
    }
  }, []);
  return (
    <Wrapper>
      <Title>
        <h1>Welcome to the Solar System!</h1>
      </Title>

      <VideoContainer>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/sVPK_u_Dvig"
          title="Solar System for Kids"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </VideoContainer>

      <ButtonContainer>
        <Link to="/vquiz1">
          <Button>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Home;
