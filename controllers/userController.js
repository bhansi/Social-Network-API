const { User, Thought } = require('../models');

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
      const user = await User
        .findOne({ _id: req.params.id })
        .populate({ path: 'thoughts', model: 'thought' })
        .populate({ path: 'friends', model: 'user' });

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
  },
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}
