import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ScoreContext } from "./ScoreProvider";

const PageBackground = styled.div`
  background-color: #e0f7fa;
  min-height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  margin: 10px;
  padding: 150px;
  max-width: 50vh;
  border-radius: 15px;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const PizzaContainer = styled.div`
  margin: 30px auto;
  padding: 30px;
  max-width: 700px;
  border-radius: 15px;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Text = styled.p`
  text-align: center;
  font-size: 20px;
  margin-bottom: 30px;
`;

const Instruction = styled.p`
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
  white-space: pre-line;
`;

const PizzaBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 220px;
  height: 220px;
  margin: 0 auto 20px auto;
  background-color: #fff3e0;
  border: 3px dashed #ff9800;
  border-radius: 12px;
  padding: 10px;
`;

const Slice = styled.div`
  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled(ActionButton)`
  background-color: #4caf50;
  &:hover {
    background-color: #45a049;
  }
`;

const AddButton = styled(ActionButton)`
  background-color: #4caf50;
  &:hover {
    background-color: #43a047;
  }
`;

const RemoveButton = styled(ActionButton)`
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
  }
`;

const SubmitButton = styled(ActionButton)`
  background-color: #ff7f50;
  &:hover {
    background-color: #e96b3a;
  }
`;

const NextButton = styled(ActionButton)`
  background-color: #2196f3;
  &:hover {
    background-color: #1976d2;
  }
`;

const TryAgainButton = styled(ActionButton)`
  background-color: #9c27b0;
  &:hover {
    background-color: #7b1fa2;
  }
`;

const Feedback = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 15px;
  font-weight: bold;
  color: ${(props) => (props.correct ? "green" : "red")};
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

const PizzaFractionGame = () => {
  const { setKinestheticScore } = useContext(ScoreContext);
  const [slices, setSlices] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Update current start time for cumulative timing
    const currentTime = Date.now();
    localStorage.setItem("kinestheticCurrentStartTime", currentTime.toString());
    
    // Get section start time from localStorage
    const sectionStartTime = parseInt(localStorage.getItem("kinestheticSectionStartTime") || Date.now());
    
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

  const questions = [
  {
    title: "🍕 Represent a Full Pizza!",
    instruction:
      "A pizza can be divided into 4 equal slices.\n" +
      "👉 A full pizza means all 4 slices are present.\n\n" +
      "Task:\nStep 1: Click on the Vegetable Pizza Slice button four times to make a full pizza.",
    correct: 4,
    requiredImage:
      "image/vp.png",
  },
  {
    title: "🍕 Represent 1/4 of a Pizza!",
    instruction:
      "Fractions represent parts of a whole. Here, the whole pizza is cut into 4 equal slices.\n" +
      "👉 1/4 means one out of four slices are chosen.\n\n" +
      "Task:\nStep 1: Click on the Pepperoni Pizza Slice button one times to make 1/4 of a pizza.",
    correct: 1,
    requiredImage:
      "image/pp_Pizza.png",
  },
  {
  title: "🍕 Represent 1/2 of a Pizza!",
  instruction:
    "Fractions show equal parts of a whole. A whole pizza has 4 slices.\n" +
    "👉 Taking 2 out of 4 slices means 1/2 of the pizza.\n\n" +
    "Task:\nStep 1: Click on the Vegetable Pizza Slice button two times.",
  correct: 2,
  requiredImage:
    "image/vp.png",
  },
{
    title: "🍕 Represent 3/4 of a Pizza!",
    instruction:
      "Fractions represent parts of a whole. Here, the whole pizza is cut into 4 equal slices.\n" +
      "👉 3/4 means three out of four slices are chosen.\n\n" +
      "Task:\nStep 1: Click on the Pepperoni Pizza Slice button three times to make 3/4 of a pizza.",
    correct: 3,
    requiredImage:
      "image/pp_Pizza.png",
  },
  {
    title: "🍕 Fulfill a Customer's Order!",
    instruction:
      "Sometimes fractions are mixed with different toppings.\n" +
      "👉 Here, the customer wants:\n  - 1/4 of the pizza as Vegetable\n  - 3/4 of the pizza as Pepperoni\n\n" +
      "Task:\nStep 1: Click the Vegetable Pizza Slice button once.\nStep 2: Click the Pepperoni Pizza Slice button three times.",
    correctSlices: {
      "image/vp.png": 1,
      "image/pp_Pizza.png":
        3,
    },
  },
];


  const sliceImages = [
    "image/vp.png",
    "image/pp_Pizza.png",
  ];

  const currentQuestion = questions[questionIndex];

  const handleAddSlice = (type) => {
    if (slices.length < 4) {
      setSlices([...slices, sliceImages[type]]);
    }
  };

  const handleRemoveSlice = () => {
    if (slices.length > 0) {
      setSlices(slices.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    let message = "";
    let correct = false;

    if (currentQuestion.requiredImage) {
      const correctCount = slices.length === currentQuestion.correct;
      const allImagesCorrect = slices.every(
        (img) => img === currentQuestion.requiredImage
      );

      if (correctCount && allImagesCorrect) {
        message = "✅ Correct! Great job!";
        correct = true;
      } else {
        if (!correctCount && allImagesCorrect) {
          message = `❌ You added ${slices.length} slices, but you need ${currentQuestion.correct}.`;
        } else if (correctCount && !allImagesCorrect) {
          message = `❌ You used the wrong type of slice.`;
        } else {
          message = `❌ You added ${slices.length} slices and some were the wrong type.`;
        }
      }
    } else if (currentQuestion.correctSlices) {
      const counts = slices.reduce((acc, img) => {
        acc[img] = (acc[img] || 0) + 1;
        return acc;
      }, {});

      const isCorrect = Object.entries(currentQuestion.correctSlices).every(
        ([img, count]) => counts[img] === count
      );

      if (isCorrect) {
        message = "✅ Correct! You matched the order perfectly!";
        correct = true;
      } else {
        let details = [];
        for (const [img, requiredCount] of Object.entries(
          currentQuestion.correctSlices
        )) {
          const given = counts[img] || 0;
          if (given !== requiredCount) {
            details.push(
              `Needed ${requiredCount}, but you gave ${given} of ${
                img.includes("pepperoni") ? "Pepperoni" : "Vegetable"
              }`
            );
          }
        }
        message = "❌ Incorrect. " + details.join("; ");
      }
    }

    setIsCorrect(correct);
    setFeedback(message);
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSlices([]);
      setFeedback("");
      setIsCorrect(null);
    } else {
      // Stop timer before ending quiz
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      setQuizEnded(true);
    }
  };

  const handleTryAgain = () => {
    setSlices([]);
    setFeedback("");
    setIsCorrect(null);
  };

  return (
    <PageBackground>
      {!showGame ? (
        <Container>
          <Title>WELCOME TO PIZZA MANIA 🍕</Title>
          <Text>
            You are working in a pizza restaurant.<br />
            Practice your skills to get all the orders right
          </Text>
          <ButtonWrapper>
            <Button onClick={() => setShowGame(true)}>Practice</Button>
          </ButtonWrapper>
        </Container>
      ) : (
        <PizzaContainer>
          <TimerDisplay>
            ⏱️ Section Time: {formatTime(elapsedTime)}
          </TimerDisplay>
          
          {!quizEnded ? (
            <>
              <Title>{currentQuestion.title}</Title>
              <Instruction>{currentQuestion.instruction}</Instruction>

              <ButtonRow>
                <AddButton onClick={() => handleAddSlice(0)}>
                  🍕 Vegetable Pizza Slice
                </AddButton>
                <AddButton onClick={() => handleAddSlice(1)}>
                  🍕 Pepperoni Pizza Slice
                </AddButton>
                <RemoveButton onClick={handleRemoveSlice}>
                  ➖ Remove Slice
                </RemoveButton>
              </ButtonRow>

              <PizzaBox>
                {slices.map((src, idx) => (
                  <Slice
                    key={idx}
                    style={{ backgroundImage: `url(${src})` }}
                  />
                ))}
              </PizzaBox>

              <ButtonRow>
                <SubmitButton onClick={handleSubmit}>✅ Submit Answer</SubmitButton>
              </ButtonRow>

              {feedback && <Feedback correct={isCorrect}>{feedback}</Feedback>}

              {feedback && !isCorrect && (
                <TryAgainButton onClick={handleTryAgain}>🔄 Try Again</TryAgainButton>
              )}

              {feedback && isCorrect && (
                <NextButton onClick={handleNext}>
                  {questionIndex < questions.length - 1
                    ? "➡️ Next Question"
                    : "End Quiz"}
                </NextButton>
              )}
            </>
          ) : (
            <>
              <Title>🎊 Practice Completed!</Title>
              <Instruction>
                Now You are ready to run the restaurant!
                <br/>Have a Blast!!
              </Instruction>
              <ButtonRow>
                <SubmitButton onClick={() => navigate("/kinesthetic_quiz3")}>
                  Proceed to the Quiz
                </SubmitButton>
              </ButtonRow>
            </>
          )}
        </PizzaContainer>
      )}
    </PageBackground>
  );
};

export default PizzaFractionGame;