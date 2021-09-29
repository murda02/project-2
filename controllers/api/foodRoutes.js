
const router = require ('express').Router();
const {Food} = require('../../models');

//GET all food
router.get('/', async (req, res) => {
    try {
        const foodData = await Food.findALl();
        res.status(200).json(foodData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET a single food
router.get('/:id', async (req, res) => {
    try {
        const foodData = await Food.findByPk(req.params.id);

        if (!foodData) {
            res.status(404).json({ message: 'Food not found'});
            return;
        }

        res.status(200).json(foodData);
    } catch (error) {
        res.status(500).json(error);
    }
});


//CREATE a food
router.post('/', async (req, res) => {
    try {
      const foodData = await Food.create(req.body);
      res.status(200).json(foodData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // DELETE a food
router.delete('/:id', async (req, res) => {
    try {
      const foodData = await Food.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!foodData) {
        res.status(404).json({ message: 'No food found with this id!' });
        return;
      }
  
      res.status(200).json(foodData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  