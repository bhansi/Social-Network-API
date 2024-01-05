const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getOneUser).put(updateUser);

module.exports = router;
