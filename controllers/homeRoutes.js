const router = require('express').Router();
const { Movie, Drink, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/user');
    return;
  }

  res.render('login');
});

router.get('/user', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  const userData = await User.findOne({
    where: {
      id: req.session.user_id
    },
    include: [Movie, Drink]
  });
  console.log(userData);
  res.render('userpage', {name: userData.name, movies: userData.movies.map((movie) => movie.get({plain: true})), drinks: userData.drinks.map((drink) => drink.get({plain: true}))});
});

module.exports = router;
