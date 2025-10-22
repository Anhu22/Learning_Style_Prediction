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

const AudioContainer = styled.div`
  margin: 30px 0;
  text-align: center;
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

const PlantAudioPage = () => {
  useEffect(() => {
    const chosenSection = localStorage.getItem("chosenSection");
    if (chosenSection) {
      localStorage.setItem(`${chosenSection}StartTime`, Date.now());
    }
  }, []);

  const text = `
 Welcome to the Solar System!

---

The Solar System is made up of the Sun, eight planets, moons, and many other objects like asteroids and comets. The Sun is the center of the Solar System, and all the planets revolve around it. Earth is the third planet from the Sun, and it’s the only planet known to support life.

---

**The Planets:**

* Mercury – The smallest planet and closest to the Sun.
* Venus – Known as Earth's twin but very hot!
* Earth – Our home planet!
* Mars – The Red Planet, famous for its color.
* Jupiter – The largest planet in our Solar System.
* Saturn – Known for its beautiful rings.
* Uranus – A blue-green planet with a tilted axis.
* Neptune – The farthest planet from the Sun.

---

**Fun Fact:**
Did you know that the Sun contains 99.86% of the mass in our Solar System?
`

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const pauseAudio = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <Wrapper>
      <Title>
        <h1> Let's Learn About Solar System</h1>
      </Title>

      <AudioContainer>
        <Button onClick={speakText}>🔊 Play Audio</Button>
      </AudioContainer>

      <ButtonContainer>
        <Link to="/a_quiz1" onClick={pauseAudio}>
          <Button>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default PlantAudioPage;
