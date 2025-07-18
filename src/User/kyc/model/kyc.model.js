// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kycSchema = new mongoose.Schema({
  user: {type:Schema.Types.ObjectId ,ref:"users"},
  document_image:{type:String},
  document_number:{type:String},
  status:{type:String, enum : ['pending','verified','rejected','blocked'], default:'pending'},
  is_verified:{type:Boolean, default:false},
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false}
},{timestamps:true});

module.exports = mongoose.model("kyc", kycSchema);