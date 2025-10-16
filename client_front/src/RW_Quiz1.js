import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import styled from "styled-components";

const QuizContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250)); 
  border-radius: 12px;
`;

const Title = styled.div`
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

/*const Timer = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff6347;
  text-align: center;
  margin-bottom: 15px;
`;*/

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.3); /* semi-transparent white */
  border-radius: 12px;
  backdrop-filter: blur(8px); /* frosted glass effect */
  -webkit-backdrop-filter: blur(8px); /* for Safari */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Question = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const AnswerOption = styled.label`
  display: block;
  margin-top: 8px;
  font-size: 16px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 15px; /* Added margin-top for consistency */
  transition: background-color 0.3s;

  &:hover {
    background-color: #e55347;
  }
`;

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const INITIAL_TIME = 300; // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [startTime, setStartTime] = useState(null);

  // Initialize start time once when the component mounts
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const questions = useMemo(() => [
    {
      question: "1. What is the name of our planet?",
      options: ["Earth", "Mars", "Venus", "Saturn"],
      correctAnswer: "Earth",
    },
    {
      question: "2. Which planet is known as the 'Red Planet'?",
      options: ["Earth", "Mars", "Jupiter", "Mercury"],
      correctAnswer: "Mars",
    },
    {
      question: "3. What is the name of the star at the center of our solar system?",
      options: ["The Moon", "The Sun", "The Earth", "The North Star"],
      correctAnswer: "The Sun",
    },
    {
      question: "4. Which planet is closest to the Sun?",
      options: ["Mercury", "Earth", "Mars", "Saturn"],
      correctAnswer: "Mercury",
    },
    {
      question: "5. What is the name of the natural satellite of earth?",
      options: ["Saturn", "The Moon", "Venus", "Mars"],
      correctAnswer: "The Moon",
    },
  ], []);

  const handleSubmit = useCallback(() => {
    if (answers.length < questions.length || answers.includes(undefined)) {
      alert("Please answer all questions before submitting the quiz.");
      return;
    }
    let calculatedScore = 0;

    // Calculate the score by checking the user's answers
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore += 1; // Add 1 for correct answer
      }
    });

  // We persist the score to localStorage; no local score state needed here
    setSubmitted(true);

    // After completing the read questionnaire and calculating the score
  localStorage.setItem("readwriteQuizScore1", calculatedScore);
    // Save the time taken for this quiz (in seconds)
    try {
      const timeTaken = Math.floor((Date.now() - (startTime || Date.now())) / 1000);
      localStorage.setItem("readwriteQuizTime1", timeTaken);
    } catch (e) {
      // fallback: derive from timer
      const fallback = INITIAL_TIME - timeLeft;
      localStorage.setItem("readwriteQuizTime1", fallback);
    }
  }, [answers, questions, startTime, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!submitted) {
        handleSubmit();
      }
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, submitted, handleSubmit]);

  const handleChange = (e, index) => {
    let newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  return (
    <QuizContainer>
      <Title>
        <h1>Solar System Quiz</h1>
      </Title>


      <div>
        {questions.map((q, index) => (
          <QuestionContainer key={index}>
            <Question>{q.question}</Question>
            {q.options.map((option, i) => (
              <AnswerOption key={i}>
                <input
                  type="radio"
                  name={`question${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={(e) => handleChange(e, index)}
                  disabled={submitted || timeLeft <= 0}
                />
                {option}
              </AnswerOption>
            ))}
          </QuestionContainer>
        ))}

        <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
          {/* Skip button - always visible
          <SubmitButton 
            style={{ background: '#f44336' }}
            onClick={() => navigate('/readwrite2')}
            disabled={submitted}
          >
            Skip ⏭️
          </SubmitButton>*/}
          
          <SubmitButton onClick={handleSubmit} disabled={submitted || timeLeft <= 0}>Submit</SubmitButton>
        </div>
      </div>
      <br></br>
      {submitted && (
        <div>
          {/*<p>Your score: {score}/5</p>*/}
          <SubmitButton
            onClick={() => {
              navigate("/readwrite2");
            }}
          >
            Proceed to Next
          </SubmitButton>
        </div>
      )}
    </QuizContainer>
  );
};

export default Quiz;
