// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const withdrawelSchema = new mongoose.Schema({
  user:{ type:Schema.Types.ObjectId ,ref:"users"},
  requested:{type:Boolean},
  is_processed:{type:Boolean},
  type:{type:String},
  amount:{type:Number},
  accounts:{type:Schema.Types.ObjectId ,ref:"bank_details"},
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false}
},{timestamps:true});

module.exports = mongoose.model("withdrawal", withdrawelSchema);