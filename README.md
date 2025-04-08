# Online Trivia Game [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

An interactive and customizable trivia game built with React, TypeScript, and Node.js. This application allows users to test their knowledge, track their scores, and customize their game experience.

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
4. Set up the database:
   - Create a `.env` file in the `server` directory with the following variables:
     ```
     DB_NAME=trivia_game_db
     DB_USER=your_username
     DB_PASSWORD=your_password
     JWT_SECRET=your_secret_key
     ```
   - Run the database setup script:
     ```bash
     npm run build
     node dist/server/seeds/index.js
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