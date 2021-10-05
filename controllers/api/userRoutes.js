const router = require ('express').Router();
const {User} = require('../../models');

//GET all users
// router.get('/', async (req, res) => {
//     try {
//         const userData = await User.findALl();
//         res.status(200).json(userData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//GET a single user
router.get('/', async (req, res) => {
  
  try {
    const userData = await User.findByPk(req.session.user_id);
    
    if (!userData) {
      res.status(404).json({ message: 'User not found'});
      return;
    }
    
    const user1 = JSON.stringify(userData)
    const user2 = JSON.parse(user1)

    console.log("!!!!!!!!!!!!!!!!!!!!" +user2)

        res.render("userpage", user2);
    } catch (error) {
        res.status(500).json(error);
    }
});


//CREATE a user
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // DELETE a user
router.delete('/:id', async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  