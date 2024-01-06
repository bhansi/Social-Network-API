const { User, Thought } = require('../models');

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
  createThought: async (req, res) => {
    try {
      let user = await User.findOne({ _id: req.body.userId });

      if (!user) {
        res.status(404).json({ message: 'User not found.' });
      }
      else if (user.username != req.body.username) {
        res.status(404).json({ message: 'Username in request does not match username in database.' });
      }
      else {
        let thought = await Thought.create(req.body);
        await user.updateOne({ thoughts: [ ...user.thoughts, thought ]});

        res.status(200).json(thought);
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );

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
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

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
  addReaction: async (req, res) => {
    try {
      let thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'Thought not found.' });
      }
      else {
        await thought.updateOne({ reactions: [ ...thought.reactions, req.body ]});

        res.status(200).json(thought);
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought found with that id.' });
      }
      else {
        let index = thought.reactions.findIndex((reaction) => reaction.reactionId == req.params.reactionId);

        if (index >= 0) {
          thought.reactions.splice(index, 1);
          await thought.updateOne({
            reactions: thought.reactions
          });

          res.status(200).json(thought);
        }
        else {
          res.status(500).json({ message: 'Reaction not found in specified thought.' })
        }
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
};
