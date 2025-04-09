import { Router, Request, Response } from "express";
import { User } from "../models/user";
import { Settings } from "../models/settings";
import { GameState } from "../models/gamestate";
import { validDifficulty, validCategory, validDate, validateUsername, validatePassword } from "../assets/utils";
import { questions } from "./game";
import { SavedScore } from "../types/SavedScore";

// ALL ROUTES PREPENDED WITH "/user"
const router = Router();

router.use("/:user",function (req: Request, res: Response, next) {
    const username = req.params["user"];
    if (username !== req.username) {
        return void res.status(403).json({ message: "Forbidden: User mismatch in route and token" });
    }
    next();
})

// Save current game for user
router.post("/:user/game/save", async function(req: Request, res: Response) {
    try {
        const username = req.params["user"];
        const current_question = parseInt(req.body["current_question"]);
        const score = parseInt(req.body["score"]);

        console.log(current_question, score);
        console.log(typeof current_question, typeof score);
        if(!Number.isInteger(current_question) || !Number.isInteger(score)) {
            return void res.status(400).json({ message: 'Invalid number' });
        }

        if(current_question > questions.length) {
            return void res.status(400).json({ message: "Current question not in questions"});
        }

        if(score >= current_question) {
            return void res.status(400).json({ message: "Score greater than current_quesion"});
        }

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return void res.status(400).json({ message: 'Invalid username' });
        }
        
        const userGameState = await GameState.findOne({ where: { userId: user["id"] }});
        if (!userGameState) {
            return void res.sendStatus(500);
        }

        userGameState["questions"] = questions;
        userGameState["current_question"] = current_question;
        userGameState["score"] = score;
        await userGameState.save();

        res.status(200).send("Game save successful");
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Retrieve saved game for user
router.get("/:user/game", async function(req: Request, res: Response) {
    try {
        const username = req.params["user"];

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return void res.status(400).json({ message: 'Invalid username' });
        }
        
        const userGameState = await GameState.findOne({ where: { userId: user["id"] }});
        if (!userGameState) {
            return void res.sendStatus(500);
        }

        res.status(200).json({ 
            questions: userGameState["questions"], 
            current_question: userGameState["current_question"], 
            score: userGameState["score"]
        });
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Return history of scores for user
router.get("/:user/scores", async function(req: Request, res: Response) {
    try {
        const username = req.params["user"];

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return void res.status(400).json({ message: 'Invalid username' });
        }
        
        const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
        if (!userSettings) {
            return void res.sendStatus(500);
        }

        res.status(200).send(userSettings["scores"]);
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Add score for user
router.post("/:user/scores", async function(req: Request, res: Response) {
    try {
        const username = req.params["user"];
        const questions = parseInt(req.body["questions"]);
        const answers = parseInt(req.body["answers"]);
        const { category, difficulty, date } = req.body;

        if(!Number.isInteger(questions) || !Number.isInteger(answers)) {
            return void res.status(400).json({ message: 'Invalid number' });
        }

        if(!validCategory(category)) {
            return void res.status(400).json({ message: 'Invalid category' });
        }

        if (!validDifficulty(difficulty)) {
            return void res.status(400).json({ message: 'Invalid difficulty' });
        }

        if (!validDate(date)) {
            return void res.status(400).json({ message: 'Invalid date' });
        }

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return void res.status(400).json({ message: 'Invalid username' });
        }
        
        const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
        if (!userSettings) {
            return void res.sendStatus(500);
        }

        const newScores: SavedScore = {
            questions: questions,
            answers: answers,
            category: category,
            difficulty: difficulty,
            date: date
        }
        userSettings["scores"].push(newScores);
        userSettings.changed('scores', true); // Updated array has to be marked to save properly
        await userSettings.save();
        res.status(200).send("Score added successfully");
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Delete history of scores for user
router.delete("/:user/scores", async function(req: Request, res: Response) {
    try {
        const username = req.params["user"];

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return void res.status(400).json({ message: 'Invalid username' });
        }
        
        const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
        if (!userSettings) {
            return void res.sendStatus(500);
        }

        userSettings["scores"] = [];
        await userSettings.save();
        res.status(200).send("Scores deleted");
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Return status of light/dark mode
router.get("/:user/darkmode", async function(req: Request, res: Response) {
    try {
        const username = req.params["user"];

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return void res.status(400).json({ message: 'Invalid username' });
        }
        
        const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
        if (!userSettings) {
            return void res.sendStatus(500);
        }

        res.status(200).send(userSettings["darkmode"]);
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Set status of light/dark mode
router.post("/:user/darkmode", async function(req: Request, res: Response) {
    try {
        const username = req.params["user"];
        const { darkmode } = req.body;

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return void res.status(400).json({ message: 'Invalid username' });
        }
        
        const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
        if (!userSettings) {
            return void res.sendStatus(500);
        }

        userSettings["darkmode"] = darkmode;
        await userSettings.save();
        res.status(200).send("Darkmode update successful");
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Return preferred difficulty
router.get("/:user/difficulty", async function(req: Request, res: Response) {
    try {
        const username = req.params["user"];

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return void res.status(400).json({ message: 'Invalid username' });
        }
        
        const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
        if (!userSettings) {
            return void res.sendStatus(500);
        }

        res.status(200).send(userSettings["difficulty"]);
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Set preferred difficulty
router.post("/:user/difficulty", async function(req: Request, res: Response) {
    try {
        const username = req.params["user"];
        const { difficulty } = req.body;

        if (!validDifficulty(difficulty)) {
            return void res.status(400).json({ message: 'Invalid difficulty' });
        }

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return void res.status(400).json({ message: 'Invalid username' });
        }
        
        const userSettings = await Settings.findOne({ where: { userId: user["id"] }});
        if (!userSettings) {
            return void res.sendStatus(500);
        }

        userSettings["difficulty"] = difficulty
        await userSettings.save();
        res.status(200).send("Difficulty update successful");
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Change password for user
router.post("/:user/changepassword", async function(req: Request, res: Response) {
    try {
        const username = req.params["user"];
        const { password } = req.body;

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return void res.status(400).json({ message: 'Invalid username' });
        }

        if(!validatePassword(password)) {
            return void res.status(400).json({
                 message: "Invalid password. Must be between 6 and 30 characters and only contain alphanumeric characters and !@#$%^&*()\-_=+\[\]{}|;:,.?<>]"
            });
        }

        user["password"] = password;
        await user.save();

        res.status(200).send("Password change successful");
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;