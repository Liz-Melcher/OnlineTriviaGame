import { User } from '../models/user.js';
import { Settings } from '../models/settings.js';

const date = new Date();
const today = date.toISOString().split('T')[0];
date.setDate(date.getDate() - 3);
const threeDaysAgo = date.toISOString().split('T')[0];
date.setDate(date.getDate() - 7);
const tenDaysAgo = date.toISOString().split('T')[0];;

const aliceScores = [
    {
        questions: 20,
        answers: 15,
        category: "Mythology",
        difficulty: "medium",
        date: today
    }, {
        questions: 10,
        answers: 8,
        category: "Sports",
        difficulty: "easy",
        date: threeDaysAgo
    }
]

const bobScores = [
    {
        questions: 25,
        answers: 11,
        category: "History",
        difficulty: "hard",
        date: threeDaysAgo
    }, {
        questions: 30,
        answers: 28,
        category: "Celebrities",
        difficulty: "easy",
        date: tenDaysAgo
    }
]

const malloryScores = [
    {
        questions: 40,
        answers: 38,
        category: "Entertainment: Books",
        difficulty: "hard",
        date: threeDaysAgo
    }
]

export const seedSettings = async () => {
  let user = await User.findOne({ where: { username: "alice" } });
  const aliceId = user!.id
  user = await User.findOne({ where: { username: "bob" } });
  const bobId = user!.id
  user = await User.findOne({ where: { username: "mallory" } });
  const malloryId = user!.id

  await Settings.bulkCreate([
    { userId: aliceId, difficulty: "medium", darkmode: false, scores: aliceScores },
    { userId: bobId, difficulty: "hard", darkmode: true, scores: bobScores },
    { userId: malloryId, difficulty: "easy", darkmode: false, scores: malloryScores },
  ],);
};
