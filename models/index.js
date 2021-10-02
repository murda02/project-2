const User = require('./User');
const Movie = require('./Movie');
const Drink = require('./Drink');

User.hasMany(Movie, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Movie.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Drink, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Drink.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Movie, Drink };