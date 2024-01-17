import { sequelize } from "../credentials/db";
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

export const Todo = sequelize.define('Todo', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    onDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });