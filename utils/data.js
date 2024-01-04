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

const thoughts = [
  'Life is an adventure waiting to unfold. Embrace the unknown and discover the extraordinary in every moment.',
  'In the chaos of everyday life, find solace in the simple joys. Take a deep breath, appreciate the small moments, and let positivity guide you.',
  'Creativity knows no bounds. Dive into your imagination, paint your world with vibrant hues, and let your ideas dance freely.',
  'Chase your dreams relentlessly. Every step forward, no matter how small, takes you closer to the extraordinary life you envision.',
  'In a world of constant chatter, pause and listen to the whispers of your heart. It often speaks the loudest truths.',
  'Kindness is a language everyone understands. Spread it generously, for even the smallest acts can create ripples of positivity.',
  'Success isn\'t just a destination; it\'s a journey fueled by perseverance and resilience. Keep pushing forward, your goals await.',
  'Embrace change, for it paves the path to growth. Even amidst uncertainty, it brings opportunities for transformation and learning.',
  'Believe in your abilities. You possess untapped potential; let your confidence soar and break barriers you once thought impossible.',
  'The world is vast, and diversity is its beauty. Embrace differences, learn from one another, and celebrate the rich tapestry of cultures.',
  'In the symphony of life, find your rhythm. Dance to it, sway through the challenges, and savor the harmonious moments.',
  'Strength isn\'t just physical; it\'s the resilience of the spirit. Face adversity with unwavering courage and emerge even stronger.',
  'Gratitude turns ordinary moments into extraordinary blessings. Take a moment to appreciate all that surrounds you.',
  'Let your passions be the compass guiding your journey. Pursue them fervently, and they\'ll lead you to fulfillment and joy.',
  'Authenticity is magnetic. Be true to yourself, for your uniqueness is your greatest strength in a world of conformity.',
  'Mindfulness is the key to presence. Be here, in this moment. It\'s where life truly happens.',
  'Forgiveness liberates the soul. Let go of the weight of resentment and embrace the freedom it brings.',
  'Empathy bridges the gaps between us. Walk in another\'s shoes, understand their journey, and connect on a deeper level.',
  'Adversity shapes character. Embrace its lessons, for they mold you into the resilient being capable of conquering any challenge.',
  'Love radiates boundlessly. Spread it generously, for it has the power to heal, unite, and transform the world.'
];

const reactions = [
  'So thought-provoking, great read!',
  'This resonates deeply with me.',
  'I couldn\'t agree more, well said!',
  'Thank you for sharing this wisdom.',
  'This is truly eye-opening. Brilliant!',
  'I needed to read this today, thanks!',
  'Such a powerful message, thank you!',
  'This made me reflect, wonderful post.',
  'Incredible insights, mind-blown!',
  'This deserves endless recognition.',
  'Your words are truly inspiring!',
  'This changed my perspective, amazing!',
  'I\'m bookmarking this for sure.',
  'So beautifully articulated, thank you!',
  'Your writing style is captivating!',
  'This hits home, thank you for sharing!',
  'I\'m sharing this with everyone I know!',
  'You have a way with words, fantastic!',
  'This made me stop and think. Amazing!',
  'This is the best thing I\'ve read today!'
];

function getRandomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

module.exports = {
  getRandomUsername: (usernames) => {
    let username;

    while(true) {
      username = `${getRandomArrayItem(adjectives)}${getRandomArrayItem(punctuations)}${getRandomArrayItem(nouns)}`;
      if(!usernames.includes(username))
        break;
    }

    return username;
  },
  getRandomEmail: (username) => {
    return `${username}@${getRandomArrayItem(domains)}.com`;
  },
  getRandomThoughts: (username, usernames) => {
    const num_thoughts = Math.floor(Math.random() * 4);
    let user_thoughts = [];
    let user_reactions = [];

    for(let i = 0; i < num_thoughts; i++) {
      let num_reactions = Math.floor(Math.random() * 4);
      for (let j = 0; j < num_reactions; j++) {
        user_reactions.push(
          {
            reactionBody: getRandomArrayItem(reactions),
            username: getRandomArrayItem(usernames)
          }
        );
      }

      user_thoughts.push(
        {
          thoughtText: getRandomArrayItem(thoughts),
          username,
          reactions: user_reactions
        }
      );

      user_reactions = [];
    }

    return user_thoughts;
  },
  getRandomFriends: (users) => {
    let num_friends = Math.floor(Math.random() * 4);
    let friends = [];

    for (let i = 0; i < num_friends; i++) {
      friends.push(users.splice(getRandomIndex(users), 1)[0]._id);
    }

    return friends;
  }
}
