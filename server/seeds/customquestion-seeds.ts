import { User } from '../models/user.js';
import { GameState } from '../models/gamestate.js';
import { ClientQuestion } from '../../interfaces/ClientQuestion.js';
import { CustomQuestion } from '../models/customquestion.js';

const customQuestions = [
    {
        question: "When was the World Wide Web opened to the public",
        correct_answer: "1993",
        incorrect_answers: [
            "1995",
            "1985",
            "1979"
        ]
    }, {
        question: "Who invented Linux?",
        correct_answer: "Linus Torvalds",
        incorrect_answers: [
            "Andrew S. Tanenbaum",
            "Dennis Ritchie",
            "Tim Bernes-Lee"
        ]
    }, {
        question: "What is Ada Lovelace best konwn for?",
        correct_answer: "Being the first computer programmer and writing the first algorithm for a machine",
        incorrect_answers: [
            "Inventing the first computer",
            "Discovering the laws of motion",
            "Developing the first programming language for the internet"
        ]
    }, {
        question: "Who was Steve Wozniak's most famous business partner?",
        correct_answer: "Steve Jobs",
        incorrect_answers: [
            "Bill Gates",
            "Alan Turing",
            "John von Neumann"
        ]
    }, {
        question: "Who popularized the phrase 'Move fast and break things'?",
        correct_answer: "Mark Zuckerberg",
        incorrect_answers: [
            "Elon Musk",
            "Peter Thiel",
            "Larry Page"
        ]
    }
]

export const seedCustomQuestions = async () => {
  await CustomQuestion.bulkCreate(customQuestions);
};
