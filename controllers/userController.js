const { User } = require('../models');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      res.json(await User.find());
    }
    catch (err) {
      res.status(500).json(err);
    }
  }
}
