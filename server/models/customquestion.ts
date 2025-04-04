// models/customQuestions.ts
import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const CustomQuestion = sequelize.define('CustomQuestions', {
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
});

export default CustomQuestion;
