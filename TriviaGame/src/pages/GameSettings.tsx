import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavBar from '../components/NavBar';

const GameSettings: React.FC = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [amount, setAmount] = useState('10');
  const [difficulty, setDifficulty] = useState('easy');
  const [category, setCategory] = useState('');
  const type = 'multiple';
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json();
        setCategories(data.trivia_categories);
        if (data.trivia_categories.length > 0) {
          setCategory(data.trivia_categories[0].id.toString());
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //const queryString = `?amount=${amount}&difficulty=${difficulty}&category=${category}&type=${type}`;
    navigate('/quiz', {
        state: {
          amount: parseInt(amount),
          difficulty,
          category,
          type,
        },
      });
  };

  return (
    <>
    <AppNavBar />
    
    <Container className="py-5">
      <h1 className="text-center mb-4">Create Your Custom Trivia Game</h1>
      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="questionAmount">
            <Form.Label>Number of Questions</Form.Label>
            <Form.Select value={amount} onChange={(e) => setAmount(e.target.value)} required>
              <option value="10">10 Questions</option>
              <option value="25">25 Questions</option>
              <option value="50">50 Questions</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="difficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
              {categories.length === 0 ? (
                <option disabled>Loading categories...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Start Game
          </Button>
        </Form>
      </Card>
    </Container>
    </>
  );
};

export default GameSettings;
