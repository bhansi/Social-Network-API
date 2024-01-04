const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomEmail, getRandomThoughts, getRandomFriends } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.info('Connected to database.');

  let db_users = await connection.db.listCollections({ name: 'users' }).toArray();
  if (db_users.length) {
    await connection.dropCollection('users');
  }

  let db_thoughts = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (db_thoughts.length) {
    await connection.dropCollection('thoughts');
  }

  let usernames = [];

  for (let i = 0; i < 10; i++) {
    usernames.push(getRandomUsername(usernames));
  }

  let users = [];
  let thoughts = [];

  usernames.forEach((username) => {
    let user_thoughts = getRandomThoughts(username, usernames.filter((x) => x != username));
    let email = getRandomEmail(username);

    thoughts.push(...user_thoughts);
    users.push(
      {
        username,
        email,
        thoughts: [],
        friends: []
      }
    );
  });

  await Thought.collection.insertMany(thoughts);
  await User.collection.insertMany(users);

  for (let user of users) {
    let user_friends = getRandomFriends(users.filter((x) => x._id != user._id));

    await User.updateOne(
      { _id: user._id },
      { $set: { friends: user_friends }}
    );
  }

  console.info('Database successfully seeded.');
  process.exit(0);
});
