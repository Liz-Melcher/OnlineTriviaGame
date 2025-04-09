import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { GameStateFactory } from './gamestate.js';
import { SettingsFactory } from './settings.js';
import { CustomQuestionFactory } from './customquestion.js';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Factories initialize the models with the sequelize instance
UserFactory(sequelize);
GameStateFactory(sequelize);
SettingsFactory(sequelize);
CustomQuestionFactory(sequelize);

export { sequelize };
