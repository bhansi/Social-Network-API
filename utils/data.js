const adjectives = [
  'Cool',
  'Awesome',
  'Crazy',
  'Epic',
  'Fantastic',
  'Magical',
  'Mystic',
  'Savage',
  'Super',
  'Sleek',
  'Mighty',
  'Electric',
  'Neon',
  'Golden',
  'Silver',
  'Infinite',
  'Dynamic',
  'Charming',
  'Brave',
  'Swift'
];

const nouns = [
  'Ninja',
  'Dragon',
  'Warrior',
  'Master',
  'Wizard',
  'Knight',
  'Angel',
  'Hero',
  'Legend',
  'Champion',
  'Joker',
  'Pirate',
  'Cyborg',
  'Phantom',
  'Vampire',
  'Guru',
  'Siren',
  'Oracle',
  'Ranger',
  'Rebel'
];

const punctuations = [
  '-',
  '.',
  '_'
];

const domains = [
  'outlook',
  'hotmail',
  'gmail',
  'yahoo'
];

function getRandomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  getRandomUsername: () => {
    return `${getRandomArrayItem(adjectives)}${getRandomArrayItem(punctuations)}${getRandomArrayItem(nouns)}`;
  },
  getRandomEmail: (username) => {
    return `${username}@${getRandomArrayItem(domains)}.com`;
  }
}
