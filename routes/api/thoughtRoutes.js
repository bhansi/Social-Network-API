const router = require('express').Router();

const {
  getAllThoughts, getOneThought
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts);

router.route('/:id').get(getOneThought);

module.exports = router;
