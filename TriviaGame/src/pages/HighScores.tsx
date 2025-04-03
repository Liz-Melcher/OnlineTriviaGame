import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';
import AppNavBar from '../components/NavBar';

// Optional: a simple map to show category names for known IDs
const categoryMap: Record<string, string> = {
  '9': 'General Knowledge',
  '10': 'Books',
  '11': 'Film',
  '12': 'Music',
  '17': 'Science & Nature',
  '21': 'Sports',
  // Add more categories as needed
};

type GameSummary = {
  score: number;
  totalQuestions: number;
  difficulty: string;
  category: string;
  date: string;
};

const HighScores: React.FC = () => {
  const [highScores, setHighScores] = useState<GameSummary[]>([]);

  useEffect(() => {
    const storedScores = localStorage.getItem('highScores');
    if (storedScores) {
      setHighScores(JSON.parse(storedScores));
    }
  }, []);

  const handleClear = () => {
    const confirmClear = window.confirm('Are you sure you want to clear all high scores?');
    if (confirmClear) {
      localStorage.removeItem('highScores');
      setHighScores([]);
    }
  };

  return (
    <>
      <AppNavBar />
      <Container className="py-5">
        <h1 className="text-center mb-4">🏆 High Scores</h1>

        {highScores.length === 0 ? (
          <p className="text-center">No games saved yet. Play a game to see your high scores here!</p>
        ) : (
          <Card className="p-4 shadow-sm">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Score</th>
                  <th>Difficulty</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {highScores.map((game, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{game.score} / {game.totalQuestions}</td>
                    <td>{game.difficulty}</td>
                    <td>{categoryMap[game.category] || `Category ${game.category}`}</td>
                    <td>{new Date(game.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="text-end">
              <Button variant="outline-danger" onClick={handleClear}>
                Clear All High Scores
              </Button>
            </div>
          </Card>
        )}
      </Container>
    </>
  );
};

export default HighScores;
