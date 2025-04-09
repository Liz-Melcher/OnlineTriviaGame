import { sequelize } from '../models/index.js';
import { seedUsers } from './user-seeds.js';
import { seedSettings } from './settings-seeds.js';
import { seedGameStates } from './gamestate-seeds.js';
import { seedCustomQuestions } from './customquestion-seeds.js';

const seedAll = async (): Promise<void> => {
    try {
      await sequelize.sync({ force: true });
      console.log('\n----- DATABASE SYNCED -----\n');
      
      await seedUsers();
      console.log('\n----- USERS SEEDED -----\n');
      
      await seedSettings();
      console.log('\n----- SETTINGS SEEDED -----\n');
      
      await seedGameStates();
      console.log('\n----- GAME STATES SEEDED -----\n');

      await seedCustomQuestions();
      console.log('\n----- CUSTOM QUESTIONS SEEDED -----\n');

      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  };
  
  seedAll();