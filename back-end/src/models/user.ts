import mongoose from "mongoose";

const {Schema} = mongoose;

const user = mongoose.model(
  'User',
  new Schema ({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },

}))

module.exports = user