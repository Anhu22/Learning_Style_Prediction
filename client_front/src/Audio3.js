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
 Welcome to Learning Fractions!

A fraction is a way to represent a part of a whole. It is written as a / b, where:

a is the numerator (the number of parts you have)

b is the denominator (the total number of parts)

Examples:

1/2 means one part out of two equal parts.

3/4 means three parts out of four equal parts.

5/8 means five parts out of eight equal parts.

Here are more examples:

2/5 means two parts out of five equal parts. Imagine splitting a cake into 5 pieces, and you take 2 of them.

7/10 means seven parts out of ten equal parts. If a chocolate bar is divided into 10 pieces and you eat 7, you have eaten 7/10 of it.

9/12 can be simplified to 3/4. This means nine parts out of twelve equal parts, which is the same as three parts out of four.

1/3 means one part out of three equal parts. Think of cutting a pizza into 3 slices, and you eat one of them.

11/15 means eleven parts out of fifteen equal parts. If you have a pizza sliced into 15 slices and you eat 11, you’ve eaten 11/15.

Different Types of Fractions:

Proper Fractions: The numerator is smaller than the denominator (e.g., 2/5, 3/4).

Improper Fractions: The numerator is greater than or equal to the denominator (e.g., 7/4, 11/8).

Mixed Numbers: A whole number and a proper fraction together (e.g., 1 1/2, 2 3/4).

Fractions are useful in everyday life — for example, when measuring ingredients for a recipe, dividing something into equal parts, or even calculating time.

Fun Tip:
Fractions can be converted into decimals and percentages. For example, 1/2 is equivalent to 0.5 or 50%!
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
        <h1> Let's Learn About Fractions</h1>
      </Title>

      <AudioContainer>
        <Button onClick={speakText}>🔊 Play Audio</Button>
      </AudioContainer>

      <ButtonContainer>
        <Link to="/a_quiz3" onClick={pauseAudio}>
          <Button>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default PlantAudioPage;
