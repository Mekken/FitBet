const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  emailaddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  cellphone: { type: String },
  deviceToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  deviceType: { type: String, required: true },
  passwordSalt: { type: String, required: true }
  challenges: [
    {
      _id: { type: String }
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
