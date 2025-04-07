import { User } from '../models/user.js';
import { GameState } from '../models/gamestate.js';
import { ClientQuestion } from '../../interfaces/ClientQuestion.js';

const aliceQuestions: ClientQuestion[] = [
    {
        "question": "What was the code name for the German invasion of the Soviet Union in WW2?",
        "correct_answer": "Operation Barbarossa",
        "incorrect_answers": [
          "Operation Kaiserschlact",
          "Operation Unthinkable",
          "Operation Molotov"
        ]
    },
    {
        "question": "When did Jamaica receive its independence from England? ",
        "correct_answer": "1962",
        "incorrect_answers": [
          "1492",
          "1963",
          "1987"
        ]
    },
    {
        "question": "On which day did construction start on &quot;The Pentagon&quot;, the headquarters for the United States Department of Defense?",
        "correct_answer": "September 11, 1941",
        "incorrect_answers": [
          "June 15, 1947",
          "January 15, 1943",
          "September 2, 1962"
        ]
    },
    {
        "question": "Which WWII tank ace is credited with having destroyed the most tanks?",
        "correct_answer": "Kurt Knispel",
        "incorrect_answers": [
          "Michael Wittmann",
          "Walter Kniep",
          "Otto Carius"
        ]
    },
    {
        "question": "In what year did Texas secede from Mexico?",
        "correct_answer": "1836",
        "incorrect_answers": [
          "1838",
          "1845",
          "1844"
        ]
    },
    {
        "question": "Who was the first President of the People&#039;s Republic of China?",
        "correct_answer": "Mao Zedong",
        "incorrect_answers": [
          "Liu Shaoqi",
          "Dong Biwu",
          "Li Xiannian"
        ]
    },
    {
        "question": "Which of these founding fathers of the United States of America later became president?",
        "correct_answer": "James Monroe",
        "incorrect_answers": [
          "Alexander Hamilton",
          "Samuel Adams",
          "Roger Sherman"
        ]
    },
    {
        "question": "Joseph Stalin had a criminal past doing what?",
        "correct_answer": "Robbing Trains",
        "incorrect_answers": [
          "Murder for Hire",
          "Tax Evasion",
          "Identity Fraud"
        ]
    },
    {
        "question": "According to scholarly estimates, what percentage of the world population at the time died due to Tamerlane&#039;s conquests?",
        "correct_answer": "5%",
        "incorrect_answers": [
          "1%",
          "3%",
          "&lt;1%"
        ]
    },
    {
        "question": "What is the name of the ship which was only a few miles away from the RMS Titanic when it struck an iceberg on April 14, 1912?",
        "correct_answer": "Californian",
        "incorrect_answers": [
          "Carpathia",
          "Cristol",
          "Commerce"
        ]
    }
]

const bobQuestions: ClientQuestion[] = [
    {
      "question": "What was the cause of Marilyn Monroes suicide?",
      "correct_answer": "Drug Overdose",
      "incorrect_answers": [
        "Knife Attack",
        "House Fire",
        "Gunshot"
      ]
    },
    {
      "question": "Aubrey Graham is better known as",
      "correct_answer": "Drake",
      "incorrect_answers": [
        "Travis Scott",
        "Lil Wayne",
        "2 Chainz"
      ]
    },
    {
      "question": "Gwyneth Paltrow has a daughter named...?",
      "correct_answer": "Apple",
      "incorrect_answers": [
        "Lily",
        "French",
        "Dakota"
      ]
    },
    {
      "question": "By which name is Ramon Estevez better known as?",
      "correct_answer": "Martin Sheen",
      "incorrect_answers": [
        "Charlie Sheen",
        "Ramon Sheen",
        "Emilio Estevez"
      ]
    },
    {
      "question": "What does film maker Dan Bell typically focus his films on?",
      "correct_answer": "Abandoned Buildings and Dead Malls",
      "incorrect_answers": [
        "Historic Landmarks",
        "Action Films",
        "Documentaries "
      ]
    },
    {
      "question": "Neil Hamburger is played by which comedian?",
      "correct_answer": "Gregg Turkington",
      "incorrect_answers": [
        "Nathan Fielder",
        "Tim Heidecker",
        "Todd Glass"
      ]
    },
    {
      "question": "Named after a character he played in a 1969 film, what is the name of the ski resort in Utah that Robert Redford bought in 1968?",
      "correct_answer": "Sundance",
      "incorrect_answers": [
        "Woodward",
        "Turner",
        "Booker"
      ]
    },
    {
      "question": "Which actress married Michael Douglas in 2000?",
      "correct_answer": "Catherine Zeta-Jones",
      "incorrect_answers": [
        "Ruth Jones",
        "Pam Ferris",
        "Sara Sugarman"
      ]
    },
    {
      "question": "By what name is Carlos Estevez better known? ",
      "correct_answer": "Charlie Sheen",
      "incorrect_answers": [
        "Ricky Martin",
        "Bruno Mars",
        "Joaquin Phoenix"
      ]
    },
    {
      "question": "Which celebrity announced his presidency in 2015?",
      "correct_answer": "Kanye West",
      "incorrect_answers": [
        "Donald Trump",
        "Leonardo DiCaprio",
        "Miley Cyrus"
      ]
    }
  ]

export const seedGameStates = async () => {
  let user = await User.findOne({ where: { username: "alice" } });
  const aliceId = user!.id
  user = await User.findOne({ where: { username: "bob" } });
  const bobId = user!.id
  user = await User.findOne({ where: { username: "mallory" } });
  const malloryId = user!.id

  await GameState.bulkCreate([
    { userId: aliceId, questions: aliceQuestions, current_question: 4, score: 2 },
    { userId: bobId, questions: bobQuestions, current_question: 7, score: 6 },
    { userId: malloryId },
  ],);
};
