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
 1. Leaves 🍃

Leaves make food for the plant using sunlight, water, and air in a process called photosynthesis.

You can think of leaves as the plant’s kitchen, where it cooks food to grow and stay healthy.

Without leaves, a plant wouldn’t get the energy it needs to survive.

2. Stem 🌿

The stem holds the plant upright and makes sure it doesn’t fall over.

It carries water and nutrients from the roots to the leaves and other parts of the plant.

Some plants, like money plants, need strong stems to grow tall and healthy.

3. Roots 🌱

Roots anchor the plant in the soil so it stays in place.

They absorb water and minerals from the soil to help the plant grow.

Roots are like the plant’s drinking straw, taking in the things it needs to survive.

4. Flowers 🌸

Flowers are often bright and colorful to attract insects and birds.

They help the plant make seeds, which grow into new plants.

Flowers are like the plant’s reproduction center.

5. Fruits 🍎

Fruits protect the seeds and help them spread to grow into new plants.

Some fruits are sweet or tasty, which encourages animals and humans to eat them and spread the seeds.

6. Herbs 🌿

Small, soft plants like mint or coriander are called herbs.

Herbs are useful in cooking, medicine, and even for smell.

They show that not all plants need to grow big to be helpful.

Why Plants Are Important 🌈

Plants make food for themselves and produce oxygen for humans and animals.

They help the environment by keeping the air clean and the soil healthy.

Every part of a plant has a specific job to help it live and grow.

Fun Tip 💡

If a plant didn’t have roots, stems, leaves, flowers, or fruits, it couldn’t survive or make new plants.

By understanding how each part works, we can explain why plants are so important in our world.
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
        <h1> Let's Learn About Plants</h1>
      </Title>

      <AudioContainer>
        <Button onClick={speakText}>🔊 Play Audio</Button>
      </AudioContainer>

      <ButtonContainer>
        <Link to="/a_quiz2" onClick={pauseAudio}>
          <Button>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default PlantAudioPage;
