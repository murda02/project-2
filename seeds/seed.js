const sequelize = require('../config/connection');
const { User, Movie, Drink } = require('../models');
const short = require('short-uuid');

const userData = require('./userData.json');
const movieData = require('./movieData.json');
const drinkData = require('./drinkData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const movie of movieData) {
    await Movie.create({
      ...movie,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const drink of drinkData) {
    await Drink.create({
      ...drink,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();