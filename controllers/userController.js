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
      const user1 = await User.findOne({ _id: req.params.userId });
      const user2 = await User.findOne({ _id: req.params.friendId });

      if (!(user1 || user2)) {
        res.status(404).json({ message: 'No user found with that id.' });
      }
      else if (req.params.userId === req.params.friendId) {
        res.status(500).json({ message: 'Cannot add yourself to your friends list.' });
      }
      else if (user1.friends.includes(req.params.friendId)) {
        res.status(500).json({ message: `These users are already friends.` });
      }
      else {
        await user1.updateOne({
          friends: [ ...user1.friends, req.params.friendId ]
        });
        await user2.updateOne({
          friends: [ ...user2.friends, req.params.userId ]
        });

        res.status(200).json({ message: 'Successfully added friend.' });
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  removeFriend: async (req, res) => {
    try {
      const user1 = await User.findOne({ _id: req.params.userId });
      const user2 = await User.findOne({ _id: req.params.friendId });

      if (!(user1 || user2)) {
        res.status(404).json({ message: 'No user found with that id.' });
      }
      else {
        let index1 = user1.friends.indexOf(req.params.friendId);
        let index2 = user2.friends.indexOf(req.params.userId);

        if (index1 >= 0) {
          user1.friends.splice(index1, 1);
          user2.friends.splice(index2, 1);

          await user1.updateOne({
            friends: user1.friends
          });
          await user2.updateOne({
            friends: user2.friends
          });

          res.status(200).json({ message: 'Successfully removed friend.' });
        }
        else {
          res.status(500).json({ message: 'These users are not friends.' });
        }
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}
