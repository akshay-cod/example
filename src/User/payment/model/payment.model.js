// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentsSchema = new mongoose.Schema({
  product: { type:Schema.Types.ObjectId ,ref:"creations" },
  order_id: { type: String },
  status:{ type: String },
  price: { type: Number},
  transaction_history: { type:Array },
  owner:{ type:Schema.Types.ObjectId ,ref:"users"},
  created_by:{ type:Schema.Types.ObjectId ,ref:"users"},
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false}
},{timestamps:true});

module.exports = mongoose.model("payments", paymentsSchema);