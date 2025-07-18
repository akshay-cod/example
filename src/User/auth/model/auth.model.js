// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  user_name:{ type:String },
  bio:{ type:String },
  email: { type: String },
  phone_number: { type: String, required:true, unique:true},
  profile_picture: { type: String },
  account_type:{type:String},
  country_code:{type:String},
  banner_image:{type: String},
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false}
},{timestamps:true});

//userSchema.index({email:1})
userSchema.index({phone_number:1})
//userSchema.index({email:1,phone_number:1},{background:true, unique:true});

module.exports = mongoose.model("users", userSchema);