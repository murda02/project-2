const router = require ('express').Router();
const {Movie} = require('../../models');

//GET all movies
router.get('/', async (req, res) => {
    try {
        const movieData = await Movie.findALl();
        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET a single movieData
router.get('/:id', async (req, res) => {
    try {
        const movieData = await Movie.findByPk(req.params.id);

        if (!movieData) {
            res.status(404).json({ message: 'Movie not found'});
            return;
        }

        res.status(200).json(movieData);
    } catch (error) {
        res.status(500).json(error);
    }
});


//CREATE a movie
router.post('/', async (req, res) => {
    try {
      const movieData = await Movie.create(req.body);
      res.status(200).json(movieData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // DELETE a movie
router.delete('/:id', async (req, res) => {
    try {
      const movieData = await Movie.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!movieData) {
        res.status(404).json({ message: 'No movie found with this id!' });
        return;
      }
  
      res.status(200).json(movieData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  