// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commission_historySchema = new mongoose.Schema({
  product:{  type:Schema.Types.ObjectId ,ref:"creations" },
  profile:{type:Schema.Types.ObjectId ,ref:"users"},
  amount:{ type:Number },
  commission_share:{ type:Number },
  user_wallet_share:{ type:Number },
  commission_percentage:{type:Number},
  owner:{  type:Schema.Types.ObjectId ,ref:"users" },
  user:{ type:Schema.Types.ObjectId ,ref:"users"},
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false}
},{timestamps:true});

module.exports = mongoose.model("commission_history", commission_historySchema);