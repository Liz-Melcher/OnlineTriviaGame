import React, { useEffect, useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap'; // React Bootstrap helps with styling, especially mobile first design
import { useLocation, useNavigate } from 'react-router-dom';
import AppNavBar from '../components/NavBar'; // 4/2/2025 - Liz made the AppNavBar for testing
//TO DO: check the final NavBar component for the import name.  Import name will need to changed in this section as well as in the return (HTML section)

// Define question shape from the API
type Question = {
  question: string; //question is a string 
  correct_answer: string; // correct answer is a string 
  incorrect_answers: string[]; // incorrect answers are an array of strings 
};

// Define game settings passed from GameSettings
type LocationState = {
  amount: number; //amount of questions (possible values are 10, 25, and 50)
  difficulty: string; // difficulty of questions (possible values are easy, medium, hard)
  category: string; // category of questions is a string that comes from the Open Trivia Api 
  type: string; // Type of questions; for this game all questions are multiple choice 
};

// Decode HTML entities from API
// so values like ", &, ', < , > display correctly and not as &amp; etc 
const decodeHTML = (html: string): string => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Shuffle an array; this makes it so the correct answer isn't always in the same position in the array 
const shuffleArray = (array: string[]): string[] =>
  [...array].sort(() => Math.random() - 0.5);

const TriviaGame: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  // Use default settings if none provided
  const totalQuestions = state?.amount ?? 10; 
  const difficulty = state?.difficulty ?? 'easy';
  const category = state?.category ?? '9';
  const type = state?.type ?? 'multiple';

  // Game state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionNum, setQuestionNum] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Current question and answers
  const currentQuestion = questions[questionNum - 1]; // current questions is questions from the array of questions
  const answers = currentQuestion // shuffling the array  so the correct answer isn't always in the same position 
    ? shuffleArray([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ])
    : [];

  // Load saved game or fetch new questions
  useEffect(() => {
    if (!state) { // if the user visits the TriviaGame without a game state, send them back to the home page 
      navigate('/');
      return;
      // a game state can come from GameSettings.tsx or it can come from a saved game
    }

    const saved = localStorage.getItem('savedGame');
    //getting the game state of a saved game 
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.questions && parsed.questionNum && parsed.score !== undefined) {
        const resume = window.confirm('Resume your last saved game?');
        if (resume) {
          setQuestions(parsed.questions);
          setQuestionNum(parsed.questionNum);
          setScore(parsed.score);
          return;
        }
      }
    }

    fetchAllQuestions();
  }, []);

  // Fetch all questions at once; this way if a user needs to save a game and come back later they can 
  const fetchAllQuestions = async () => {
    const url = `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficulty}&category=${category}&type=${type}`;
    const res = await fetch(url);
    const data = await res.json();

    // Decode HTML entities from API
    // so values like ", &, ', < , > display correctly and not as &amp; etc 
    const decoded = data.results.map((q: Question) => ({
      ...q,
      question: decodeHTML(q.question),
      correct_answer: decodeHTML(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(decodeHTML),
    }));

    setQuestions(decoded);
  };

  // adds one point to the score if a user answers correctly 
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      setScore(prev => prev + 1);
    }
  };
  // then the question number is greater than or equal to the total number of questions; game is over
  const handleNext = () => {
    if (questionNum >= totalQuestions) {
      setGameOver(true);
      localStorage.removeItem('savedGame'); // clear saved game on completion
    } else {
        //when the question number is less than the total number of questions, the game moves to the next question
        //when the game moves to the next question no answers are selected 
      setQuestionNum(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  // when a game is over and a user wants to play again with the same settings
  // user will have the same number of questions, category, and difficulty level if they use this button
  // TO DO: do we need a second button that allows users to go back to the game settings page and update their choices?  If so; this is the code that could be updated: 
//   <Button variant="secondary" className="mt-3" onClick={handleRestart}>
//   Play Again (Same Settings)
//  </Button>

//  <Button variant="outline-primary" className="mt-3 ms-2" onClick={() => navigate('/settings')}>
//   Change Settings
//  </Button>
  const handleRestart = () => {
    setScore(0);
    setQuestionNum(1);
    setSelectedAnswer(null);
    setGameOver(false);
    fetchAllQuestions();
    localStorage.removeItem('savedGame');
  };
  
  // handles the game save so a user can come back later 
  const handleSave = () => {
    const gameToSave = {
      questions,
      questionNum,
      score,
    };
    localStorage.setItem('savedGame', JSON.stringify(gameToSave));
    alert('Game saved! You can resume it later.');
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
