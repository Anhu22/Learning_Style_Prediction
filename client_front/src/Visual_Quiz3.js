import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Question = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const AnswerOption = styled.label`
  display: block;
  margin-top: 10px;
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
  margin-top: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e55347;
  }
`;

const TimerDisplay = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #ff6347;
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 15px;
  border-radius: 8px;
`;

const FinalTimeDisplay = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #4caf50;
  margin: 15px 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
`;

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [finalTime, setFinalTime] = useState(null);

  useEffect(() => {
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

  const handleChange = (e, index) => {
    let newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.length < questions.length || answers.includes(undefined)) {
      alert("Please answer all questions before submitting the quiz.");
      return;
    }
    
    // Stop the timer
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });

    setSubmitted(true);
    
    // Save ONLY the score
    localStorage.setItem("visualQuizScore3", calculatedScore.toString());
    console.log(`Visual Quiz 3 Score Saved: ${calculatedScore}`);
    
    // Get final cumulative time
    const sectionStartTime = parseInt(localStorage.getItem("visualSectionStartTime") || Date.now());
    const totalElapsed = Math.floor((Date.now() - sectionStartTime) / 1000);
    setFinalTime(totalElapsed);
    
    // Store the total section time for the entire section (cumulative)
    localStorage.setItem("visualTotalSectionTime", totalElapsed.toString());
    
    // 🔥 CRITICAL: Store in format Result.js expects
    localStorage.setItem("visualTotalTime", totalElapsed.toString());
    localStorage.setItem("visualTotalScore", calculatedScore.toString());
    
    console.log(`📊 Visual Section Completed! Total time: ${totalElapsed} seconds, Score: ${calculatedScore}`);
    console.log(`🔑 Stored for Result.js: visualTotalTime=${totalElapsed}s, visualTotalScore=${calculatedScore}`);
  };

  const questions = [
    {
      question: "1. You baked a cake and cut it into 8 equal slices. If you ate 3 slices, what fraction of the cake did you eat?",
      options: ["3/5", "3/8", "5/8", "1/2"],
      correctAnswer: "3/8",
    },
    {
      question: "2. A class has 20 students. 5 of them are wearing glasses. What fraction of the students wear glasses?",
      options: ["5/15", "5/20", "1/5", "1/4"],
      correctAnswer: "1/4",
    },
    {
      question: "3. You ran 6 kilometers out of your 10 km goal. What fraction of your goal have you completed?",
      options: ["3/5", "2/5", "6/10", "1/2"],
      correctAnswer: "3/5",
    },
    {
      question: "4. A pizza has 12 slices. If your friend eats 9 slices, what fraction of the pizza did they eat in simplest form?",
      options: ["9/12", "3/4", "2/3", "1/2"],
      correctAnswer: "3/4",
    },
    {
      question: "5. A fruit basket has 15 fruits: 6 apples, 5 oranges, and 4 bananas. What fraction of the fruits are apples?",
      options: ["6/15", "2/5", "1/3", "Both 6/15 and 2/5"],
      correctAnswer: "Both 6/15 and 2/5",
    },
  ];

  return (
    <QuizContainer>
      <Title><h1>🔢 Fractions Quiz</h1></Title>

      <TimerDisplay>
        ⏱️ Section Time: {formatTime(elapsedTime)}
      </TimerDisplay>

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
                disabled={submitted}
              />
              {" "}{option}
            </AnswerOption>
          ))}
        </QuestionContainer>
      ))}

      <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
        <SubmitButton onClick={handleSubmit} disabled={submitted}>
          Submit
        </SubmitButton>
      </div>
      <br></br>
      {submitted && (
        <div>
          {finalTime && (
            <FinalTimeDisplay>
              ✅ Visual Section Completed! Total Time: {formatTime(finalTime)}
            </FinalTimeDisplay>
          )}
          <SubmitButton
            onClick={() => {
              navigate("/section-result");
            }}
          >
            Get the Result
          </SubmitButton>
        </div>
      )}
    </QuizContainer>
  );
};

export default Quiz;