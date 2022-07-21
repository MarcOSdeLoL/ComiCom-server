const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: 'User´s info is'
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    favComics: [{
      type: Schema.Types.ObjectId,
      ref: 'Comic'
    }],
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema)

module.exports = User
