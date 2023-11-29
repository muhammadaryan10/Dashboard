// const { Password } = require("@mui/icons-material");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: Number,
    require: false,
  },
  city: {
    type: String,
  },
  age: { 
    type: Number
}
});

const User = mongoose.model("User", userSchema);

module.exports = User;