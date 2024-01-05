const { User } = require('../models');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      res.status(200).json(await User.find());
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getOneUser: async (req, res) => {
    try {
      const user = await User.find({ _id: req.params.id });

      if (!user) {
        res.status(404).json({ message: 'No user found with that id.' });
      }
      else {
        res.status(200).json(user);
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}
