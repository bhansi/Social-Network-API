const router = require('express').Router();

const {
  getAllThoughts
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts);

module.exports = router;
