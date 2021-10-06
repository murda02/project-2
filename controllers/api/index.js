const router = require('express').Router();
const movieRoutes = require('./movieRoutes');
//const drinkRoutes = require('./drinkRoutes');
const userRoutes = require('./userRoutes');

router.use('/movie', movieRoutes);
//router.use('/drink', drinkRoutes);
router.use('/user', userRoutes);

module.exports = router;
