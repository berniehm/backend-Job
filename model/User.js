
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
      fname: {
        type: String,
        required: true,
        trim: true
      },
      lname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        unique:true,
        dropDups:true,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      role:{
          type:String,
          required:true
      }
    },
    {
      timestamps: true
    }
  );
  
  const User = mongoose.model("User", userSchema);

  module.exports = User ;
  
  