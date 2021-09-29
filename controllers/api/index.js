const router = require('express').Router();
const movieRoutes = require('./movieRoutes');
const foodRoutes = require('./foodRoutes');
const userRoutes = require('./userRoutes');

router.use('/movie', movieRoutes);
router.use('/food', foodRoutes);
router.use('/tags', userRoutes);

module.exports = router;
