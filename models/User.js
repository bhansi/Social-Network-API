const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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
    thoughts: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Thought',
      }
    ],
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function () { return this.friends.length });

const User = model('user', userSchema);

module.exports = User;
