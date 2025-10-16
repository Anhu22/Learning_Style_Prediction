import React, { useState } from "react";
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
    const [score, setScore] = useState(0);
    const INITIAL_TIME = 300;
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [startTime, setStartTime] = useState(null);

    React.useEffect(() => { setStartTime(Date.now()); }, []);
    React.useEffect(() => {
      if (timeLeft <= 0) { if (!submitted) handleSubmit(); return; }
      const id = setInterval(() => setTimeLeft(t => t-1), 1000);
      return () => clearInterval(id);
    }, [timeLeft, submitted]);

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
    
        // Calculate the score by checking the user's answers
        questions.forEach((q, index) => {
          if (answers[index] === q.correctAnswer) {
            calculatedScore += 1; // Add 1 for correct answer
          }
        });
    
        // Set the calculated score in the state
        setScore(calculatedScore);
        setSubmitted(true);
    
    // After completing the read questionnaire and calculating the score
  localStorage.setItem("visualQuizScore2", calculatedScore); // Store the score in localStorage
  try { const timeTaken = Math.floor((Date.now() - (startTime || Date.now()))/1000); localStorage.setItem("visualQuizTime2", timeTaken); }
  catch(e) { localStorage.setItem("visualQuizTime2", (INITIAL_TIME - timeLeft)); }
      };

  const questions = [
    {
      question: "1. Which part of the plant makes food?",
      options: ["Root", "Stem", "Leaves", "Flower"],
      correctAnswer: "Leaves",
    },
    {
      question: "2. Which part of the plant protects the flower?",
      options: ["Seed", "Leaves", "Bud", "Stem"],
      correctAnswer: "Bud",
    },
    {
      question: "3. What is the function of the roots?",
      options: [
        "Make seeds",
        "Hold the plant and absorb water",
        "Carry food",
        "Make flowers",
      ],
      correctAnswer: "Hold the plant and absorb water",
    },
    {
      question: "4. What is the colorful part of a Plant?",
      options: ["Root", "Flower", "Stem", "Fruit"],
      correctAnswer: "Flower",
    },
    {
      question: "5. Which part of the plant holds the seeds?",
      options: ["Stem", "Root", "Fruit", "Leaf"],
      correctAnswer: "Fruit",
    },
  ];

  return (
    <QuizContainer>
      <Title><h1>🌿 Plants Quiz</h1></Title>

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
              {" "}{option}
            </AnswerOption>
          ))}
        </QuestionContainer>
      ))}

      <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
        {/* Skip button - always visible 
        <SubmitButton 
          style={{ background: '#f44336' }}
          onClick={() => navigate('/visual3')}
        >
          Skip ⏭️
        </SubmitButton>*/}
        
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </div>
      <br></br>
      {submitted && (
        <div>
        
        <SubmitButton
          onClick={() => {
            navigate("/visual3");
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
