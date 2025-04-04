import { DataTypes } from 'sequelize';
import { sequelize } from './index';
import User from './user'; // Import the User model for the foreign key reference

const GameState = sequelize.define('GameState', {
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
    allowNull: false
  },
  current_question: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0  // Default score is 0
  }
});

export default GameState;
