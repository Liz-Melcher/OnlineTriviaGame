import { Sequelize, DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { User } from './user'; // Import the User model for the foreign key reference

class GameState extends Model {
  declare id: number;
  declare userId: number;
  declare questions: object[]; // JSONB array
  declare current_question: number;
  declare score: number;
}

function GameStateFactory(sequelize: Sequelize) {
  GameState.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,  // References the User model
          key: 'id'
        },
        onDelete: 'CASCADE'  // Ensures that deleting a user also deletes their game state
      },
      questions: {
        type: DataTypes.JSONB,  // Stores an array of JSON objects
        allowNull: true,
        defaultValue: null
      },
      current_question: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      }
    }, 
    {
      sequelize,
      modelName: "GameState",
      schema: "trivia",
    }
  )
}

export { GameState, GameStateFactory }
