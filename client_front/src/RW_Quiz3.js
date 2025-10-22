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
  margin-top: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e55347;
  }
`;

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

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
    let calculatedScore = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });

    // Calculate time taken
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000); // in seconds

  setScore(calculatedScore);
  setSubmitted(true);

  // Store score in localStorage for result page
  localStorage.setItem("readwriteQuizScore3", calculatedScore);
  localStorage.setItem("readwriteQuizTime3", timeTaken);
  };

  // ✅ Replaced with L3 real-world application questions
  const questions = [
    {
      question: "1. You cut a pizza into 12 slices. You ate 4 slices. What fraction of the pizza did you eat?",
      options: ["4/12 = 1/3", "4/8 = 1/2", "3/12 = 1/4", "8/12 = 2/3"],
      correctAnswer: "4/12 = 1/3",
    },
    {
      question: "2. A classroom has 30 students. 18 of them are boys. What fraction of the class are boys?",
      options: ["18/30 = 3/5", "18/25", "12/30 = 2/5", "15/30 = 1/2"],
      correctAnswer: "18/30 = 3/5",
    },
    {
      question: "3. Ramesh ran 9 kilometers of his 12 km target. What fraction of his target has he completed?",
      options: ["9/12 = 3/4", "9/15 = 3/5", "6/12 = 1/2", "12/9"],
      correctAnswer: "9/12 = 3/4",
    },
    {
      question: "4. A cake recipe needs 2/3 cup of sugar. You only have a 1/3 cup measuring spoon. How many times do you need to fill it?",
      options: ["1 time", "2 times", "3 times", "4 times"],
      correctAnswer: "2 times",
    },
    {
      question: "5. A fruit basket has 20 fruits: 8 apples, 6 bananas, and 6 oranges. What fraction of the fruits are bananas?",
      options: ["8/20 = 2/5", "6/20 = 3/10", "14/20 = 7/10", "6/14"],
      correctAnswer: "6/20 = 3/10",
    },
  ];

  return (
    <QuizContainer>
      <Title><h1>🔢 Fractions Quiz (Apply Level)</h1></Title>

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
              />
              {option}
            </AnswerOption>
          ))}
        </QuestionContainer>
      ))}

      {!submitted && (
        <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
          {/* Skip button - always visible 
          <SubmitButton
            style={{ background: '#f44336' }}
            onClick={() => navigate('/section-result')}
          >
            Skip ⏭️
          </SubmitButton>*/}

          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </div>
      )}
      {submitted && (
        <div>
          {/*<p>Your score: {score}/5</p>*/}
          <SubmitButton onClick={() => navigate("/section-result")}>
            Get the Result
          </SubmitButton>
        </div>
      )}
    </QuizContainer>
  );
};

export default Quiz;
