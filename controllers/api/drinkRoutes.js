const router = require ('express').Router();
const {Drink} = require('../../models');

//GET all drink
router.get('/', async (req, res) => {
    try {
        const drinkData = await Drink.findAll();
        res.status(200).json(drinkData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET a single drink
router.get('/:id', async (req, res) => {
    try {
        const drinkData = await Drink.findByPk(req.params.id);

        if (!drinkData) {
            res.status(404).json({ message: 'Drink not found'});
            return;
        }

        res.status(200).json(drinkData);
    } catch (error) {
        res.status(500).json(error);
    }
});


//CREATE a drink
router.post('/', async (req, res) => {
    try {
      const drinkData = await Drink.create(req.body);
      res.status(200).json(drinkData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // DELETE a drink
router.delete('/:id', async (req, res) => {
    try {
      const drinkData = await Drink.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!drinkData) {
        res.status(404).json({ message: 'No drink found with this id!' });
        return;
      }
  
      res.status(200).json(drinkData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  //sorry
  