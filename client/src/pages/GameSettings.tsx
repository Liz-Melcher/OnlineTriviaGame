import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TokenServices from "../utils/TokenServices";

const GameSettings: React.FC = () => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [category, setCategory] = useState("General Knowledge");
  const [difficulty, setDifficulty] = useState("easy");

  const navigate = useNavigate();

  const handleStartGame = async () => {
    const settings = {
      amount: numQuestions.toString(),
      category,
      difficulty: difficulty.toLowerCase(),
    };

    const queryParams = new URLSearchParams(settings).toString();

    try {
      const res = await fetch(`/game?${queryParams}`, {
        method: "GET",
        headers: { Authorization: `${TokenServices.getBearer()}`},
      });

      if (!res.ok) {
        throw new Error("Failed to fetch game questions");
      }

      const questions = await res.json();
      console.log("Game questions:", questions);

      // Redirect to the first question or game page
      navigate("/quiz");
    } catch (err) {
      console.error("Error fetching game questions:", err);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Customize Your Game</h2>
      <Form>
        <Form.Group controlId="formNumQuestions" className="mb-3">
          <Form.Label>Number of Questions</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={50}
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>General Knowledge</option>
            <option>Science & Nature</option>
            <option>History</option>
            <option>Geography</option>
            <option>Entertainment: Music</option>
            {/* Add more categories here if needed */}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formDifficulty" className="mb-3">
          <Form.Label>Difficulty</Form.Label>
          <Form.Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={handleStartGame}>
          Start Game
        </Button>
      </Form>
    </Container>
  );
};

export default GameSettings;
