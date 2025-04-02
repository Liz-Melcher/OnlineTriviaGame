import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AppNavBar from '../components/NavBar';

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type LocationState = {
  amount: number;
  difficulty: string;
  category: string;
  type: string;
};

const decodeHTML = (html: string): string => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const shuffleArray = (array: string[]): string[] =>
  [...array].sort(() => Math.random() - 0.5);

const TriviaGame: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  const totalQuestions = state?.amount ?? 10;
  const difficulty = state?.difficulty ?? 'easy';
  const category = state?.category ?? '9'; // Default to General Knowledge
  const type = state?.type ?? 'multiple';

  const [score, setScore] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Redirect if no game settings were passed
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  useEffect(() => {
    if (questionNum <= totalQuestions) {
      fetchQuestion();
    }
  }, [questionNum]);

  const fetchQuestion = async () => {
    const url = `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&category=${category}&type=${type}`;
    const res = await fetch(url);
    const data = await res.json();
    const fetchedQuestion: Question = data.results[0];
    setQuestion(fetchedQuestion);
    const allAnswers = shuffleArray([
      ...fetchedQuestion.incorrect_answers.map(decodeHTML),
      decodeHTML(fetchedQuestion.correct_answer),
    ]);
    setAnswers(allAnswers);
    setSelectedAnswer(null);
  };

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === decodeHTML(question!.correct_answer)) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (questionNum >= totalQuestions) {
      setGameOver(true);
    } else {
      setQuestionNum(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionNum(1);
    setGameOver(false);
  };

  const handleSave = () => {
    alert('Game saved for later! (This would tie to backend in full app)');
  };

  return (
    <>
       <AppNavBar />
        

      <Container className="py-5">
        <div className="text-center mb-4">
          <h1 className="display-5 fw-bold">Trivia Time!</h1>
          <p className="lead">Test your knowledge with a random quiz question.</p>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div><strong>Score:</strong> {score}</div>
          <div><strong>Question:</strong> {questionNum} / {totalQuestions}</div>
        </div>

        <Card className="shadow-sm mb-4">
          <Card.Body>
            {gameOver ? (
              <>
                <h3>Game Over!</h3>
                <p>You scored <strong>{score}</strong> out of {totalQuestions}.</p>
                <Button variant="secondary" className="mt-3" onClick={handleRestart}>Play Again</Button>
              </>
            ) : (
              <>
                <Card.Title>{question ? decodeHTML(question.question) : 'Loading question...'}</Card.Title>
                <div className="d-grid gap-2 mt-3">
                  {answers.map((ans, index) => {
                    let variant = 'outline-secondary';
                    if (selectedAnswer) {
                      if (ans === decodeHTML(question!.correct_answer)) variant = 'success';
                      else if (ans === selectedAnswer) variant = 'danger';
                    }
                    return (
                      <Button
                        key={index}
                        variant={variant}
                        disabled={!!selectedAnswer}
                        onClick={() => handleAnswerClick(ans)}
                      >
                        {ans}
                      </Button>
                    );
                  })}
                </div>
                <div className="text-end mt-3">
                  <Button variant="outline-secondary" size="sm" onClick={handleSave}>💾 Save Game for Later</Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>

        {!gameOver && (
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
