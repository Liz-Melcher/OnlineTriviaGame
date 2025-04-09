import { Router, Request, Response } from "express";
import { CustomQuestion } from "../models/customquestion.js";
import { ClientQuestion } from "../types/ClientQuestion.js";

// ALL ROUTES PREPENDED WITH "/customquestions"
const router = Router();

// CUSTOM QUESTIONS routes
router.get("/", async function(req: Request, res: Response) {
    try {
        const customQuestions: ClientQuestion[] = await CustomQuestion.findAll({
            attributes: ["id", "question", "correct_answer", "incorrect_answers"],
            raw: true
        });

        return void res.status(200).send(customQuestions);
    } catch(error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post("/add", async function(req: Request, res: Response) {
    try {
        const { question, correct_answer, incorrect_answers } = req.body;

        if (
            typeof question !== 'string' ||
            typeof correct_answer !== 'string' ||
            !Array.isArray(incorrect_answers) ||
            !incorrect_answers.every(ans => typeof ans === 'string')
        ) {
            return void res.status(400).json({ message: 'Invalid custom question format' });
        }

        const newCustomQuestion = {
            question: question,
            correct_answer: correct_answer,
            incorrect_answers: incorrect_answers
        }
        await CustomQuestion.create(newCustomQuestion);

        res.status(200).send("Custom question added successfully");
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.delete("/delete/:questionId", async function(req: Request, res: Response) {
    try {
        const questionId = parseInt(req.params["questionId"]);
        if(!Number.isInteger(questionId)) {
            return void res.status(400).json({ message: 'Invalid questionId' });
        }

        const deletedCount = await CustomQuestion.destroy({ where: { id: questionId } });
        if (deletedCount === 0) {
            return void res.status(400).json({ message: "No question found with that ID."});
        }

        res.status(200).send("Delete custom question successful");
    } catch(error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;