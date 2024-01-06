const router = require('express').Router();

const {
  getAllThoughts,
  getOneThought,
  createThought
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').get(getOneThought);

module.exports = router;
