import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from "./models/index.js";
import authenticateToken from "./assets/authenticate-token.js";

import gameRoutes from "./routes/game.js";
import userRoutes from "./routes/user.js";

import { User } from "./models/user.js";
import { Settings } from "./models/settings.js";
import { GameState } from "./models/gamestate.js";
import { validateUsername, validatePassword } from "./assets/utils.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Needed to parse body requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/game", authenticateToken, gameRoutes);
app.use("/user", authenticateToken, userRoutes);

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

// type Question = {
//     type: string,
//     difficulty: string,
//     category: string,
//     question: string,
//     correct_answer: string,
//     incorrect_answers: string[]
// }

// type TransformedQuestion = {
//     question: string,
//     correct_answer: string,
//     incorrect_answers: string[]
// }

// let questions: TransformedQuestion[] = [];

// GAME ROUTES
// app.get("/game", async function(req: Request, res: Response) {
//     try {
//         const amount = req.query['amount'];
//         const categoryName = req.query['category'];
//         const difficulty = req.query['difficulty'];

//         const categoryId = categories.find(category => category.name === categoryName)?.id;

//         const triviaAPIquery = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`
//         const response = await fetch(triviaAPIquery);

//         if(!response.ok) {
//             res.status(response.status).send(`Too many requests. Wait a few seconds and try again.`)
//             throw new Error(`Response status: ${response.status}`);
//         }

//         const data = await response.json();
//         if(data['response_code'] !== 0) {
//             res.status(400).send(`Invalid query parameters to Trivia API. Response code: ${data['response_code']}`)
//             throw new Error(`Invalid query parameters to Trivia API. Response code: ${data['response_code']}`);
//         } else {
//             const results = data['results'];
//             const transformedResults = results.map((result: Question) => ({
//                 "question": result['question'], 
//                 "correct_answer": result['correct_answer'], 
//                 "incorrect_answers": result['incorrect_answers']
//             }));

//             questions = transformedResults;

//             return void res.status(200).send(transformedResults);
//         }
//     } catch(error: any) {
//         console.error(error.message);
//     }
// })

// app.get("/game/custom", function(req, res) {
//     req.query; // The game parameters from the GET request
//     // Gets trivia questions from Custom Question table. Stores them into an array.
//     res.send("GET /trivia/custom");
// })

// app.get("/game/:questionId", function(req, res) {
//     if(questions.length === 0){
//         return void res.status(400).send("No game loaded yet. Try /game first.")
//     }

//     const questionId = req.params["questionId"];
//     const question = questions[Number(questionId)];
//     if (!question) {
//         return void res.status(400).send(`${questionId} is not a valid question number`);
//     }
//     return void res.status(200).send(question);
// })


// USER ROUTES
// For registering a new user
app.post("/register", async function(req, res) {
    try {
        const { username, password } = req.body;

        // See if username already exists
        const user = await User.findOne({ where: { username } });
        if (user) {
            return void res.status(400).json({ message: 'Username already exists' });
        }

        if(!validateUsername(username)) {
            return void res.status(400).json({
                 message: "Invalid username. Must be between 6 and 30 characters and only contain alphanumeric characters"
            });
        }

        if(!validatePassword(password)) {
            return void res.status(400).json({
                 message: "Invalid password. Must be between 6 and 30 characters and only contain alphanumeric characters and !@#$%^&*()\-_=+\[\]{}|;:,.?<>]"
            });
        }

        const newUser = await User.create({ username: username, password: password });
        await Settings.create({ userId: newUser.id })
        await GameState.create({ userId: newUser.id })

        res.status(200).send("User registration successful");
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// // Save current game for user
// app.post("/user/:user/game/save", async function(req, res) {
//     try {
//         const username = req.params["user"];
//         const current_question = parseInt(req.body["current_question"]);
//         const score = parseInt(req.body["score"]);

//         console.log(current_question, score);
//         console.log(typeof current_question, typeof score);
//         if(!Number.isInteger(current_question) || !Number.isInteger(score)) {
//             return void res.status(400).json({ message: 'Invalid number' });
//         }

//         if(current_question > questions.length) {
//             return void res.status(400).json({ message: "Current question not in questions"});
//         }

//         if(score >= current_question) {
//             return void res.status(400).json({ message: "Score greater than current_quesion"});
//         }

//         // Find the user by username
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return void res.status(400).json({ message: 'Invalid username' });
//         }
        
//         const userGameState = await GameState.findOne({ where: { userId: user["id"] }});
//         if (!userGameState) {
//             return void res.sendStatus(500);
//         }

//         userGameState["questions"] = questions;
//         userGameState["current_question"] = current_question;
//         userGameState["score"] = score;
//         await userGameState.save();

//         res.status(200).send("Game save successful");
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// // Retrieve saved game for user
// app.get("/user/:user/game", async function(req, res) {
//     try {
//         const username = req.params["user"];

//         // Find the user by username
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return void res.status(400).json({ message: 'Invalid username' });
//         }
        
//         const userGameState = await GameState.findOne({ where: { userId: user["id"] }});
//         if (!userGameState) {
//             return void res.sendStatus(500);
//         }

//         res.status(200).json({ 
//             questions: userGameState["questions"], 
//             current_question: userGameState["current_question"], 
//             score: userGameState["score"]
//         });
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// // Return history of scores for user
// app.get("/user/:user/scores", async function(req, res) {
//     try {
//         const username = req.params["user"];

//         // Find the user by username
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return void res.status(400).json({ message: 'Invalid username' });
//         }
        
//         const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
//         if (!userSettings) {
//             return void res.sendStatus(500);
//         }

//         res.status(200).send(userSettings["scores"]);
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// // Add score for user
// app.post("/user/:user/scores", async function(req, res) {
//     try {
//         const username = req.params["user"];
//         const questions = parseInt(req.body["questions"]);
//         const answers = parseInt(req.body["answers"]);
//         const { category, difficulty, date } = req.body;

//         if(!Number.isInteger(questions) || !Number.isInteger(answers)) {
//             return void res.status(400).json({ message: 'Invalid number' });
//         }

//         if(!validCategory(category)) {
//             return void res.status(400).json({ message: 'Invalid category' });
//         }

//         if (!validDifficulty(difficulty)) {
//             return void res.status(400).json({ message: 'Invalid difficulty' });
//         }

//         if (!validDate(date)) {
//             return void res.status(400).json({ message: 'Invalid date' });
//         }

//         // Find the user by username
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return void res.status(400).json({ message: 'Invalid username' });
//         }
        
//         const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
//         if (!userSettings) {
//             return void res.sendStatus(500);
//         }

//         const newScores: SavedScore = {
//             questions: questions,
//             answers: answers,
//             category: category,
//             difficulty: difficulty,
//             date: date
//         }
//         userSettings["scores"].push(newScores);
//         userSettings.changed('scores', true); // Updated array has to be marked to save properly
//         await userSettings.save();
//         res.status(200).send("Score added successfully");
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// // Delete history of scores for user
// app.delete("/user/:user/scores", async function(req, res) {
//     try {
//         const username = req.params["user"];

//         // Find the user by username
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return void res.status(400).json({ message: 'Invalid username' });
//         }
        
//         const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
//         if (!userSettings) {
//             return void res.sendStatus(500);
//         }

//         userSettings["scores"] = [];
//         await userSettings.save();
//         res.status(200).send("Scores deleted");
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// // Return status of light/dark mode
// app.get("/user/:user/darkmode", async function(req, res) {
//     try {
//         const username = req.params["user"];

//         // Find the user by username
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return void res.status(400).json({ message: 'Invalid username' });
//         }
        
//         const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
//         if (!userSettings) {
//             return void res.sendStatus(500);
//         }

//         res.status(200).send(userSettings["darkmode"]);
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// // Set status of light/dark mode
// app.post("/user/:user/darkmode", async function(req, res) {
//     try {
//         const username = req.params["user"];
//         const { darkmode } = req.body;

//         // Find the user by username
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return void res.status(400).json({ message: 'Invalid username' });
//         }
        
//         const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
//         if (!userSettings) {
//             return void res.sendStatus(500);
//         }

//         userSettings["darkmode"] = darkmode;
//         await userSettings.save();
//         res.status(200).send("Darkmode update successful");
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// // Return preferred difficulty
// app.get("/user/:user/difficulty", async function(req, res) {
//     try {
//         const username = req.params["user"];

//         // Find the user by username
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return void res.status(400).json({ message: 'Invalid username' });
//         }
        
//         const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
//         if (!userSettings) {
//             return void res.sendStatus(500);
//         }

//         res.status(200).send(userSettings["difficulty"]);
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// // Set preferred difficulty
// app.post("/user/:user/difficulty", async function(req, res) {
//     try {
//         const username = req.params["user"];
//         const { difficulty } = req.body;

//         if (!validDifficulty(difficulty)) {
//             return void res.status(400).json({ message: 'Invalid difficulty' });
//         }

//         // Find the user by username
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return void res.status(400).json({ message: 'Invalid username' });
//         }
        
//         const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
//         if (!userSettings) {
//             return void res.sendStatus(500);
//         }

//         userSettings["difficulty"] = difficulty
//         await userSettings.save();
//         res.status(200).send("Difficulty update successful");
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// // Change password for user
// app.post("/user/:user/changepassword", async function(req, res) {
//     try {
//         const username = req.params["user"];
//         const { password } = req.body;

//         // Find the user by username
//         const user = await User.findOne({ where: { username } });
        
//         if (!user) {
//             return void res.status(400).json({ message: 'Invalid username' });
//         }

//         if(!validatePassword(password)) {
//             return void res.status(400).json({
//                  message: "Invalid password. Must be between 6 and 30 characters and only contain alphanumeric characters and !@#$%^&*()\-_=+\[\]{}|;:,.?<>]"
//             });
//         }

//         user["password"] = password;
//         await user.save();

//         res.status(200).send("Password change successful");
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })


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
