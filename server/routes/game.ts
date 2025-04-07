import { Router, Request, Response } from "express";
import { categories } from "../assets/categories.js";
import { ClientQuestion } from "../interfaces/ClientQuestion.js"

export interface APIQuestion {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export let questions: ClientQuestion[] = [];

const router = Router();

// GAME ROUTES
router.get("/", async function(req: Request, res: Response) {
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
            const transformedResults = results.map((result: APIQuestion) => ({
                "question": result['question'], 
                "correct_answer": result['correct_answer'], 
                "incorrect_answers": result['incorrect_answers']
            }));

            questions = transformedResults;

            return void res.status(200).send(transformedResults);
        }
    } catch(error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Gets trivia questions from Custom Question table. Stores them into an array.
// router.get("/custom", function(req, res) {
//     req.query; // The game parameters from the GET request
//     res.send("GET /trivia/custom");
// })

router.get("/:questionId", function(req: Request, res: Response) {
    if(questions.length === 0){
        return void res.status(400).send("No game loaded yet. Try /game first.")
    }

    const questionId = parseInt(req.params["questionId"]);
    if(!Number.isInteger(questionId)) {
        return void res.status(400).json({ message: 'Invalid questionId' });
    }

    const question = questions[questionId];
    if (!question) {
        return void res.status(400).send(`${questionId} is not a valid question number`);
    }
    return void res.status(200).send(question);
})

export default router;