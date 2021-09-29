const router = require ('express').Router();
const {User} = require('../../models');

//GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findALl();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET a single user
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);

        if (!userData) {
            res.status(404).json({ message: 'User not found'});
            return;
        }

        res.status(200).json(userData);
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
  
  module.exports = router;
  