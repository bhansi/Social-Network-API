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
      res.json(await User.create(req.body));
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );

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
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

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
  addFriend: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user found with that id.' });
      }
      else if (req.params.userId === req.params.friendId) {
        res.status(500).json({ message: 'Cannot add yourself to your friends list.' });
      }
      else if (user.friends.includes(req.params.friendId)) {
        res.status(500).json({ message: `This user is already in ${user.username}'s friend list.` });
      }
      else {
        await user.updateOne({
          friends: [ ...user.friends, req.params.friendId ]
        });
        res.status(200).json(user);
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  removeFriend: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user found with that id.' });
      }
      else {
        let index = user.friends.indexOf(req.params.friendId);

        if (index >= 0) {
          user.friends.splice(index, 1);
          await user.updateOne({
            friends: user.friends
          });

          res.status(200).json(user);
        }
        else {
          res.status(500).json({ message: `Friend not found in ${user.username}'s friends list.` })
        }
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}
