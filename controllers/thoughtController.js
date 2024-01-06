const { Thought } = require('../models');

module.exports = {
  getAllThoughts: async (req, res) => {
    try {
      res.status(200).json(await Thought.find());
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
};
