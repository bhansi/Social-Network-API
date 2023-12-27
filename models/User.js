const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (input) => {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
        },
        message: 'Invalid email address format.'
      }
    },
    thoughts: [ thoughtSchema ],
    friends: [ userSchema ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

userSchema.virtual('friendCount').get(() => this.friends.length);

const User = model('user', userSchema);

module.exports = User;
