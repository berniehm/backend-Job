
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
      start: {
        type: String,
       // required: true,
      },
      end: {
        type: String
      },
      details: {
        type: String
      },
      notes: {
        type: String
      },
      breaks:{
        type : Array
      },
      documents:{
        type:Buffer
      },
      customer:{
        type:String
      },
      price:{
        type:String
      },
      estimatedtime:{
        type:String
      },
      user_id : {
        type:String,
        required:true
      }
    },
    {
      timestamps: true
    }
  );
  
  const Job = mongoose.model("Job", jobSchema);

  module.exports = Job ;
  
  