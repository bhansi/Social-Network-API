const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reactionSchema = new Schema(
  {
    reactionId: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString('en-us')
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString('en-us')
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ reactionSchema ]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

thoughtSchema.virtual('reactionCount').get(function () { this.reactions.length });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
