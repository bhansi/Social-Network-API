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
  },
  getOneThought: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })

      if (!thought) {
        res.status(404).json({ message: 'No thought found with that id.' });
      }
      else {
        res.status(200).json(thought);
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
