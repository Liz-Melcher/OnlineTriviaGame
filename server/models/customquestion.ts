// models/customQuestions.ts
import { Sequelize, DataTypes, Model } from 'sequelize';

import { sequelize } from './index.js';

class CustomQuestion extends Model {
  declare id: number;
  declare question: string;
  declare correct_answer: string;
  declare incorrect_answer: string[];
}

function CustomQuestionFactory(sequelize: Sequelize) {
  CustomQuestion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correct_answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      incorrect_answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CustomQuestion', // Name of the model in the database
    }
  )
}

export { CustomQuestion, CustomQuestionFactory };
