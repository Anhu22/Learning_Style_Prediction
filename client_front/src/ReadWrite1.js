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

const HomeContainer = styled.div`
  margin: 20px;
  padding: 20px;A
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
  
  // Handler for the Start button: store the chosen section and start time.
  // Navigation is performed by the surrounding <Link/> so this only records state.
  const handleStartClick = () => {
    try {
      localStorage.setItem("chosenSection", "readwrite");
      localStorage.setItem("readwriteStartTime", Date.now().toString());
    } catch (e) {
      // localStorage can fail in some environments; fail silently but log for debugging
      // eslint-disable-next-line no-console
      console.error('Failed to set start time in localStorage', e);
    }
  };
  return (
    <Wrapper>
      <Title>
        <h1>Welcome to the Solar System!</h1>
      </Title>

      <HomeContainer>
        <p>
          The Solar System is made up of the Sun, eight planets, moons, and many
          other objects like asteroids and comets. The Sun is the center of the
          Solar System, and all the planets revolve around it. Earth is the third
          planet from the Sun, and it’s the only planet known to support life.
        </p>

        <p><strong>The Planets:</strong></p>
        <ul>
          <li>Mercury - The smallest planet and closest to the Sun.</li>
          <li>Venus - Known as Earth's twin but very hot!</li>
          <li>Earth - Our home planet!</li>
          <li>Mars - The Red Planet, famous for its color.</li>
          <li>Jupiter - The largest planet in our Solar System.</li>
          <li>Saturn - Known for its beautiful rings.</li>
          <li>Uranus - A blue-green planet with a tilted axis.</li>
          <li>Neptune - The farthest planet from the Sun.</li>
        </ul>

        <p><strong>Fun Fact:</strong> Did you know that the Sun contains 99.86% of the mass in our Solar System?</p>
      </HomeContainer>

      <ButtonContainer>
        <Link to="/rw_quiz1">
          <Button onClick={handleStartClick}>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Home;
