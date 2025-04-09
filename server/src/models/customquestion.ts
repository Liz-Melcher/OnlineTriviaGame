// models/customQuestions.ts
import { Sequelize, DataTypes, Model } from 'sequelize';

class CustomQuestion extends Model {
  declare id: number;
  declare question: string;
  declare correct_answer: string;
  declare incorrect_answers: string[];
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
      incorrect_answers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CustomQuestion', 
      schema: "trivia",// Name of the model in the database
    }
  )
}

export { CustomQuestion, CustomQuestionFactory };
