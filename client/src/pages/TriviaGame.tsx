import React, { useEffect, useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap'; // React Bootstrap helps with styling, especially mobile first design
//import { useNavigate } from 'react-router-dom';
//import TokenServices from '../utils/TokenServices';
import { useLocation, useNavigate } from 'react-router-dom'

import TokenServices from '../utils/TokenServices';
import { SavedScore } from "../../../server/src/types/SavedScore";

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

// type LocationState = {
//   amount: number;
//   difficulty: string;
//   category: string;
//   type: string;
// };

// const decodeHTML = (html: string): string => {
//   const txt = document.createElement('textarea');
//   txt.innerHTML = html;
//   return txt.value;
// };

const shuffleArray = (array: string[]): string[] =>
  [...array].sort(() => Math.random() - 0.5);

const TriviaGame: React.FC = () => {
  //const location = useLocation();
  //const navigate = useNavigate();
  //const state = location.state as LocationState | undefined;

  // const totalQuestions = state?.amount ?? 10;
  // const difficulty = state?.difficulty ?? 'easy';
  // const category = state?.category ?? '9';
  // const type = state?.type ?? 'multiple';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionNum, setQuestionNum] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const currentQuestion = questions[questionNum - 1];
  const answers = currentQuestion
    ? shuffleArray([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ])
    : [];

    const location = useLocation();

  useEffect(() => {

    console.log(location.state);
    
    if (location.state?.questions){
      setQuestions(location.state.questions)
    }
    else {
      console.error("No questions passed from game settings")
    }
    
    setQuestionNum(location.state.current_question || 1);
    setScore(location.state.score || 0);
  }, [location.state]);

  const navigate = useNavigate();
  

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = async () => {
    if (questionNum >= questions.length) {
      setGameOver(true);

      const numQuestions = questions.length;
      const category = location.state.category;
      const difficulty = location.state.difficulty;
      const today = new Date().toISOString().split('T')[0];
      const savedScore: SavedScore = {
        questions: numQuestions,
        answers: score,
        category: category,
        difficulty: difficulty,
        date: today
      }
  
      // console.log(questions.length);
      // console.log(score);
      // console.log(location.state.category);
      // console.log(location.state.difficulty);
      // console.log(new Date().toISOString().split('T')[0])
      // console.log(savedScore);

      try {
        const user = TokenServices.getUsername();
        await fetch(`/user/${user}/scores`, { 
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `${TokenServices.getBearer()}`,
          },
          body: JSON.stringify(savedScore),
        });
      } catch (err) {
        console.error('Failed to save high score:', err);
      }
    } else {
      setQuestionNum(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleSave = async () => {
    const gameToSave = {
      questions,
      questionNum,
      score,
    };

    try {
      await fetch('user/:user/game/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameToSave),
      });
      alert('Game saved! You can resume it later.');
    } catch (err) {
      console.error('Failed to save game:', err);
      alert('There was an error saving your game.');
    }
  };

  // function saveScore() {
  //   const numQuestions = questions.length;
  //   const category = location.state.category;
  //   const difficulty = location.state.difficulty;
  //   const today = new Date().toISOString().split('T')[0];

  //   const savedScore: SavedScore = {
  //     questions: numQuestions,
  //     answers: score,
  //     category: category,
  //     difficulty: difficulty,
  //     date: today
  //   }

  //   console.log(questions.length);
  //   console.log(score);
  //   console.log(location.state.category);
  //   console.log(location.state.difficulty);
  //   console.log(new Date().toISOString().split('T')[0])
  //   console.log(savedScore);
    // try {
    //   await fetch('user/:user/scores', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(gameToSave),
    //   });
    //   alert('Game saved! You can resume it later.');
    // } catch (err) {
    //   console.error('Failed to save game:', err);
    //   alert('There was an error saving your game.');
    // }
  // }

  function decodeHtmlEntities(str: string) {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent;
  }

  return (
    <>
      <Container fluid className="p-3 row justify-content-center text-align center">
        <div className="col-12 col-md-8 col-lg-6">
          <img
            src="/images/Trivia.jpg"
            alt="Trivia Game"
            className="img-fluid rounded-circle mb-3 shadow"
          />
        </div>
        <div className="text-center mb-4">
          <h1 className="display-5 fw-bold">Trivia Time!</h1>
          <p className="lead">Test your knowledge with a random quiz question.</p>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div><strong>Score:</strong> {score}</div>
          <div><strong>Question:</strong> {questionNum} / {questions.length}</div>
        </div>

        <Card className="shadow-sm mb-4">
          <Card.Body>
            {gameOver ? (
              <>
                <h3>Game Over!</h3>
                <p>You scored <strong>{score}</strong> out of {questions.length}.</p>
                <Button variant="secondary" className="mt-3" onClick={() => { navigate("/settings") }}>Play Again</Button>
              </>
            ) : !currentQuestion ? (
              <p>Loading questions...</p>
            ) : (
              <>
                <Card.Title>{decodeHtmlEntities(currentQuestion.question)}</Card.Title>
                <div className="d-grid gap-2 mt-3">
                  {answers.map((ans, index) => {
                    let variant = 'outline-secondary';
                    if (selectedAnswer) {
                      if (ans === currentQuestion.correct_answer) variant = 'success';
                      else if (ans === selectedAnswer) variant = 'danger';
                    }
                    return (
                      <Button
                        key={index}
                        variant={variant}
                        disabled={!!selectedAnswer}
                        onClick={() => handleAnswerClick(ans)}
                      >
                        {decodeHtmlEntities(ans)}
                      </Button>
                    );
                  })}
                </div>
                <div className="text-end mt-3">
                  <Button variant="outline-secondary" size="sm" onClick={handleSave}>
                    💾 Save Game for Later
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>

        {!gameOver && currentQuestion && (
          <div className="text-center">
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              Next Question
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default TriviaGame;