import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'alice', password: 'password123' },
    { username: 'bob', password: '123password' },
    { username: 'mallory', password: 'pass123word' },
  ], { individualHooks: true });
};
