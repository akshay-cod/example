// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new mongoose.Schema({
  user:{ type:Schema.Types.ObjectId ,ref:"users"},
  wallet_balance:{type:Number},
  purchases:{type:Number},
  sold:{type:Number},
  types_of_creations:{type:Object},
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false}
},{timestamps:true});

module.exports = mongoose.model("wallet", walletSchema);