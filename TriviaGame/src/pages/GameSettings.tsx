import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap'; // react bootstrap makes the nav bar mobile friendly, among other features 
import { useNavigate } from 'react-router-dom';
import AppNavBar from '../components/NavBar'; // 4/2/2025 this is from Liz's code for testing;
// TO DO: Check that AppNavBar is the final name; if not it needs to changed on the import, and in the return section


//GameSettings allows users to customize their trivia game using the open trivia API options
//some options from the API are disabled, specifically the true false option
const GameSettings: React.FC = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]); //list of categories fetched from the trivia API as an array 
  const [amount, setAmount] = useState('10'); //defaults to 10 questions 
  const [difficulty, setDifficulty] = useState('easy'); // defaults to easy difficulty 
  const [category, setCategory] = useState(''); //defaults to the 'any' category 
  const type = 'multiple'; //multiple choice questions only; no True False 
  const navigate = useNavigate();

  
  //Fetch trivia categories from the Open trivia database API when mounted 
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch('https://opentdb.com/api_category.php'); //this is the api website 
        const data = await res.json();
        setCategories(data.trivia_categories);
        // Defaults to the first category in the array list if available 
        if (data.trivia_categories.length > 0) {
          setCategory(data.trivia_categories[0].id.toString());
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  //handle the form submission and navigate to the quiz page with the settings passed .

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/quiz', {
        // pass the settings to the TriviaGame page 
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
