import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user';
import { GameStateFactory } from './gamestate';
import { SettingsFactory } from './settings';
import { CustomQuestionFactory } from './customquestion';

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
