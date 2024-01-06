const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {
  getRandomUsername,
  getRandomEmail,
  getRandomThoughts,
  getRandomFriends,
  pairThoughts
} = require('./data');

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
    let new_friends = getRandomFriends(user._id, users);
    let new_thoughts = pairThoughts(user.username, thoughts);

    let user1 = await User.findOne({ _id: user._id });

    for (let friend_id of new_friends) {
      let user2 = await User.findOne({ _id: friend_id });

      await user2.updateOne({
        $set: {
          friends: [ ...user2.friends, user1._id ]
        }
      });
    }

    await user1.updateOne(
      {
        $set: {
          friends: [ ...user1.friends, ...new_friends ],
          thoughts: new_thoughts
        }
      }
    );
  }

  console.info('Database successfully seeded.');
  process.exit(0);
});
