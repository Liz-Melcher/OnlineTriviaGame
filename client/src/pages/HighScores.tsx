import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';

import TokenServices from '../utils/TokenServices';
import { SavedScore } from '../../../server/src/types/SavedScore';

const HighScores: React.FC = () => {
  const [highScores, setHighScores] = useState<SavedScore[]>([]);

  // Load history of scores from backend
  useEffect(() => {
    async function fetchScores() {
      try {
        const user = TokenServices.getUsername()
        const res = await fetch(`/user/${user}/scores`, {
          method: 'GET',
          headers: { Authorization: `${TokenServices.getBearer()}`},
        });

        if(!res.ok) {
          throw new Error("Error fetching score history");
        }

        const scores = await res.json();
        console.log(scores);
        setHighScores(scores);
      } catch(err) {
        console.error("Error fetching score history:", err);
      }
    }

    fetchScores();
  }, []);

  // Clear history of scores
  const handleClear = async () => {
    if (window.confirm('Are you sure you want to clear your scores?')) {
      try {
        const user = TokenServices.getUsername()
        const res = await fetch(`/user/${user}/scores`, {
          method: 'DELETE',
          headers: { Authorization: `${TokenServices.getBearer()}`},
        });

        console.log(res);
        if(!res.ok) {
          throw new Error("Error clearing score history");
        }

        setHighScores([]);
      } catch(err) {
        console.error("Error clearing score history:", err);
      }
    }
  }

  return (
    <>
      
      <Container fluid className="p-3 row justify-content-center text-center">
      <div className="col-12 col-md-8 col-lg-6">
            <img
              src="/images/Trivia.jpg"
              alt="Trivia Game"
              className="img-fluid rounded-circle mb-3 shadow"
            /> </div>
        <h1 className="text-center mb-4">🏆 High Scores</h1>

        {highScores.length === 0 ? (
          <p className="text-center">No games saved yet. Play a game to see your high scores here!</p>
        ) : (
          <Card className="p-4 shadow-sm">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Difficulty</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {highScores.map((game: SavedScore, index) => (
                  <tr key={index}>
                    <td>{game.answers} / {game.questions}</td>
                    <td>{game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}</td>
                    <td>{game.category}</td>
                    <td>{game.date}</td>
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
