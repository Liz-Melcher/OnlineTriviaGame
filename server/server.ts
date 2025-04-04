import express from "express";
import { sequelize } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Needed to parse body requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// LOGIN ROUTES
app.post("/login", function(_req, res) {
    res.end("POST /login")
})

app.post("/logout", function(_req, res) {
    res.end("POST /logout")
})


// GAME ROUTES
app.get("/game", function(req, res) {
    req.query; // The game parameters from the GET request
    // Gets trivia questions from API. Stores them into an array.
    res.send("GET /trivia");
})

app.get("/game/custom", function(req, res) {
    req.query; // The game parameters from the GET request
    // Gets trivia questions from Custom Question table. Stores them into an array.
    res.send("GET /trivia/custom");
})

app.get("/game/:questionId", function(req, res) {
    req.params.questionId; // Question number
    // questions[questionId]: question number to return
    res.send("GET /trivia/:questionId")
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
sequelize.sync({ force: true}).then(() => console.log("All models synced succssfully"))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
