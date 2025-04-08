import React, { useEffect, useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap'; // React Bootstrap helps with styling, especially mobile first design
import { useLocation, useNavigate } from 'react-router-dom';


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

// const decodeHTML = (html: string): string => {
//   const txt = document.createElement('textarea');
//   txt.innerHTML = html;
//   return txt.value;
// };

const shuffleArray = (array: string[]): string[] =>
  [...array].sort(() => Math.random() - 0.5);

const TriviaGame: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  const totalQuestions = state?.amount ?? 10;
  const difficulty = state?.difficulty ?? 'easy';
  const category = state?.category ?? '9';
  const type = state?.type ?? 'multiple';

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

  // useEffect(() => {
  //   const loadGame = async () => {
  //     if (!state) {
  //       navigate('/');
  //       return;
  //     }

  //     try {
  //       const res = await fetch('user/:user/game');
  //       const saved = await res.json();
  //       console.log("Loaded saved game:", saved);

  //       if (saved?.questions && saved?.questionNum && saved?.score !== undefined) {
  //         const resume = window.confirm('Resume your last saved game?');
  //         if (resume) {
  //           setQuestions(saved.questions);
  //           setQuestionNum(saved.questionNum);
  //           setScore(saved.score);
  //           return;
  //         }
  //       }
  //     } catch (err) {
  //       console.error('Failed to load saved game:', err);
  //     }

  //     fetchAllQuestions();
  //   };

  //   loadGame();
  // }, []);

  const fetchAllQuestions = async () => {
    try {
      const response = await fetch('/api/game');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
  
      const data: Question[] = await response.json();
      setQuestions(data); // 
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = async () => {
    if (questionNum >= totalQuestions) {
      setGameOver(true);

      const gameSummary = {
        score,
        totalQuestions,
        difficulty,
        category,
        date: new Date().toISOString(),
      };

      try {
        await fetch('/api/scores', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(gameSummary),
        });
      } catch (err) {
        console.error('Failed to save high score:', err);
      }
    } else {
      setQuestionNum(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionNum(1);
    setSelectedAnswer(null);
    setGameOver(false);
    fetchAllQuestions();
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

  return (
    <>
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
            ) : !currentQuestion ? (
              <p>Loading questions...</p>
            ) : (
              <>
                <Card.Title>{currentQuestion.question}</Card.Title>
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
                        {ans}
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