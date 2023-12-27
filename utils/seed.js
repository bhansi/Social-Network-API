const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.info('Connected to database.');

  let users = await connection.db.listCollections({ name: 'user' }).toArray();
  if (users.length) {
    await connection.dropCollection('user');
  }

  let thoughts = await connection.db.listCollections({ name: 'thought' }).toArray();
  if (thoughts.length) {
    await connection.dropCollection('thought');
  }

  users = [];
  thoughts = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 5; i++) {
    const username = getRandomUsername();
    const email = getRandomEmail(username);

    users.push({
      username,
      email,
      thoughts,
    });
  }

  // Add students to the collection and await the results
  await Student.collection.insertMany(students);

  // Add courses to the collection and await the results
  await Course.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.info('Database successfully seeded.');
  process.exit(0);
});
