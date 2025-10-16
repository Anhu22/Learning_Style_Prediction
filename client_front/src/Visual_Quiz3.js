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

  React.useEffect(()=>{ setStartTime(Date.now()); }, []);
  React.useEffect(()=>{ if(timeLeft<=0){ if(!submitted) handleSubmit(); return;} const id=setInterval(()=>setTimeLeft(t=>t-1),1000); return ()=>clearInterval(id); }, [timeLeft, submitted]);

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

    // Calculate score
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);

    // Save score in localStorage
    localStorage.setItem("visualQuizScore3", calculatedScore);
    try { const timeTaken = Math.floor((Date.now() - (startTime || Date.now()))/1000); localStorage.setItem("visualQuizTime3", timeTaken); }
    catch(e) { localStorage.setItem("visualQuizTime3", (INITIAL_TIME - timeLeft)); }
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
            onClick={() => navigate('/section-result')}
          >
            Skip ⏭️
          </SubmitButton>*/}

          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </div>
      <br></br>
      {submitted && (
        <div>
          {/*<p>Your score: {score}/5</p>*/}
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
