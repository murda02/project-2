const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Food extends Model {}

Food.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    active: {
        type: DataTypes.BOOLEAN,
    },
    phone: {
        type: DataTypes.INTEGER,
    },
    street_address: {
        type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'food',
  }
);

// Something to add later is a link to the resteraunts on GrubHub. Example: https://www.grubhub.com/restaurant/five-guys-1855-29th-st-1154-boulder/2804484
// Breakdown:
// https://www.grubhub.com/restaurant/[NAME OF RESTERAUNT]-[ADDRESS]-[ID]

module.exports = Food;