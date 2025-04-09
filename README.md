# Online Trivia Game [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

An interactive and customizable trivia game built with React, TypeScript, and Node.js. This application allows users to test their knowledge, track their scores, and customize their game experience.

## User Story

AS a bored human
I WANT to play a trivia game so that I can have fun and kill time.
I WANT to choose trivia categories and difficulty levels so that I can customize the game to my interests.
I WANT to choose how many questions to play (10, 25, or 50) so that I can control the length of the game.
I WANT to see my score history so that I can track my progress over time.
I WANT to save a game in progress so that I can continue it later.
I WANT the app to be responsive so that I can comfortably play on my phone.
SO THAT I can have fun passing time

## Acceptance Criteria

GIVEN a Trivia game with a secure login page
WHEN I load the login page
THEN I am presented with a home screen where I can start a new game, continue an existing game, view scores, and change user settings
WHEN I enter my username and password
THEN I am authenticated using JSON Web Tokens (JWT) and redirected to the main Trivia home page
WHEN I click on Register a new user from the login page
THEN I am taken to a page create a new user
WHEN I start a new game
THEN I am asked settings of the game such as number of question, category, difficulty
THEN The trivia game starts with those settings
WHEN I continue an existing game
THEN I resume the game where I last saved it
WHEN I am viewing a question
THEN The page will present the question and four multiple choice answers. The user will be prompted to select the right answer.
WHEN I select an answer and click Next Question
THEN It will display whether the question was correct or not and move on to the next question.
WHEN I finish the game
THEN The page will display the score, it will ask to play again, and it will save the score for the user.
WHEN I view scores
THEN I am taken to a page that shows a history of scores for that use. This includes the date, the category, the difficulty and the score.
THEN? An average score, and badges awarded for number of questions answered
WHEN I change user settings
THEN I am taken to a page where I can clear my score history, toggle light and dark mode, set the preferred difficulty and change the user password
THEN? Clear badges

## Features

- **User Authentication**: Secure login and signup using JSON Web Tokens (JWT).
- **Customizable Gameplay**: Choose the number of questions, difficulty level, and category.
- **Save and Resume**: Save your game progress and resume later.
- **Score History**: View your past scores and track your progress.
- **User Settings**: Clear scores, toggle light/dark mode, set preferred difficulty, and change your password.
- **Responsive Design**: Optimized for mobile and desktop devices.
- **Custom Questions**: Add your own trivia questions to the game.

## Technologies Used

- **Frontend**: React, TypeScript, React Router, Bootstrap
- **Backend**: Node.js, Express, Sequelize (ORM), TypeScript
- **Database**: PostgreSQL (production)
- **API**: Open Trivia Database (https://opentdb.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/OnlineTriviaGame.git
   cd OnlineTriviaGame
   ```

2. Install dependencies for both the client and server:
   ```bash
   npm run install
   ```
3. Create the database:
 ```bash
  psql -U your_username -f server/db/createdb.sql
 ```
4. Set up the `.env`, you can use `.env.example`as a template :
   - Create a `.env` file in the `server` directory with the following variables:
     ```
     DB_NAME=trivia_game_db
     DB_USER=your_username
     DB_PASSWORD=your_password
     JWT_SECRET=your_secret_key
     ```
   

5. Start the server:
   ```bash
   npm run start
   ```

6. Start the client:
   ```bash
   cd ../client
   npm run dev
   ```

6. Open the application in your browser:
   ```
   http://localhost:5173
   ```


## License
Project license: MIT

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contribution Guidelines

Contributions are welcome! Please fork the repository and submit a pull request.

## Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing trivia questions.
- [Bootstrap](https://getbootstrap.com/) for styling.
- [React](https://reactjs.org/) and [Node.js](https://nodejs.org/) for the framework and runtime.

---
Enjoy playing and learning with the Online Trivia Game!