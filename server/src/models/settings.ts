// models/settings.ts
import { Sequelize, DataTypes, Model } from 'sequelize';

import { User } from './user.js'; // Import the User model for the foreign key reference

class Settings extends Model {
  declare id: number;
  declare userid: number;
  declare difficulty: string;
  declare scores: object[]; // JSONB array
  declare darkmode: boolean;
}

function SettingsFactory(sequelize: Sequelize) {
  Settings.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: User,  // References the User model
          key: 'id',
        }, 
        onDelete: 'CASCADE',  // Ensures that deleting a user also deletes their game state
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "medium"
      },
      scores: { 
        type: DataTypes.ARRAY(DataTypes.JSONB),  // Stores an array of JSON objects
        allowNull: false,
        defaultValue: [],
      },
      darkmode: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Settings",
      schema: "trivia",
    }
  )
}

export { Settings, SettingsFactory }
