const User = require('./User');
const Movie = require('./Movie');
const Food = require('./Food');

User.hasMany(Movie, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Movie.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Food, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Food.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Movie, Food };