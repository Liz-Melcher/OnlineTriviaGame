import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from "./models/index.js";
import { User } from "./models/user.js";
import authenticateToken from "./assets/authenticate-token.js";
import { categories } from "./assets/categories.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Needed to parse body requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// LOGIN ROUTES
app.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
          return void res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return void res.status(400).json({ message: 'Invalid username or password' });
        }
    
        // Password is valid, respond with JWT token
        const token = jwt.sign({ "username": username }, process.env.JWT_SECRET_KEY!, { expiresIn: "30m" });
        res.status(200).json({ "token": token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Logout will be handled client side by destroying the JWT token
// app.post("/logout", function(_req, res) {
//     res.end("POST /logout")
// })

type Question = {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

type TransformedQuestion = {
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

let questions: TransformedQuestion[] = [];

// GAME ROUTES
app.get("/game", async function(req: Request, res: Response) {
    try {
        const amount = req.query['amount'];
        const categoryName = req.query['category'];
        const difficulty = req.query['difficulty'];

        const categoryId = categories.find(category => category.name === categoryName)?.id;

        const triviaAPIquery = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`
        const response = await fetch(triviaAPIquery);

        if(!response.ok) {
            res.status(response.status).send(`Too many requests. Wait a few seconds and try again.`)
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        if(data['response_code'] !== 0) {
            res.status(400).send(`Invalid query parameters to Trivia API. Response code: ${data['response_code']}`)
            throw new Error(`Invalid query parameters to Trivia API. Response code: ${data['response_code']}`);
        } else {
            const results = data['results'];
            const transformedResults = results.map((result: Question) => ({
                "question": result['question'], 
                "correct_answer": result['correct_answer'], 
                "incorrect_answers": result['incorrect_answers']
            }));

            questions = transformedResults;

            return void res.status(200).send(transformedResults);
        }
    } catch(error: any) {
        console.error(error.message);
    }
})

app.get("/game/custom", function(req, res) {
    req.query; // The game parameters from the GET request
    // Gets trivia questions from Custom Question table. Stores them into an array.
    res.send("GET /trivia/custom");
})

app.get("/game/:questionId", function(req, res) {
    if(questions.length === 0){
        return void res.status(400).send("No game loaded yet. Try /game first.")
    }

    const questionId = req.params["questionId"];
    const question = questions[Number(questionId)];
    if (!question) {
        return void res.status(400).send(`${questionId} is not a valid question number`);
    }
    return void res.status(200).send(question);
})


// USER ROUTES
// For registering a new user
app.post("/user/register", function(req, res) {
    req.body; // Gets info from POST request
    res.send("POST /user/register");
})

// Save current game for user
app.post("/user/:user/game/save", function(req, res) {
    req.params; // Gets username
    req.body; // Gets current game info such as all game questions and answers, current question number, and current score
    res.send("POST /user/:user/game/save");
})

// Retrieve saved game for user
app.get("/user/:user/game", function(req, res) {
    req.params; // Gets username
    res.send("GET /user/:user/game");
})

// Return history of scores for user
app.get("/user/:user/scores", function(req, res) {
    req.params; // Gets username
    res.send("GET /user/:user/scores");
})

// Return status of light/dark mode
app.get("/user/:user/lightdarkmode", function(req, res) {
    req.params; // Gets username
    res.send("GET /user/:user/lightdarkmode");
})

// Set status of light/dark mode
app.post("/user/:user/lightdarkmode", function(req, res) {
    req.params; // Gets username
    req.body; // Gets "light" or "dark"
    res.send("POST /user/:user/lightdarkmode");
})

// Return preferred difficulty
app.get("/user/:user/difficulty", function(req, res) {
    req.params; // Gets username
    res.send("GET /user/:user/difficulty");
})

// Set preferred difficulty
app.post("/user/:user/difficulty", function(req, res) {
    req.params; // Gets username
    req.body; // Gets difficulty
    res.send("POST /user/:user/difficulty");
})

// Delete history of scores for user
app.delete("/user/:user/scores", function(req, res) {
    req.params; // Gets username
    res.send("DELETE /user/:user/game");
})

// Change password for user
app.post("/user/:user/changepassword", function(req, res) {
    req.params; // Gets username
    req.body; // Gets passwords
    res.send("POST /user/:user/passwordreset");
})


// CUSTOM QUESTIONS routes
app.get("/customquestions", function(_req, res) {
    res.send("GET /customquestions")
})

app.post("/customquestions/add", function(req, res) {
    req.body; // Gets custom question and answers
    res.send("POST /customquestion/add");
})

app.delete("/customquestions/delete/:questionId", function(req, res) {
    req.params; // Gets questionId
    res.send("DELETE /customquestion/delete/:questionId");
})

// Create models in database
sequelize.sync({ force: false, logging: false }).then(() => console.log("All models synced succssfully"))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
