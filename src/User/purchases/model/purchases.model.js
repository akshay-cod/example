// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchasesSchema = new mongoose.Schema({
  product: { type:Schema.Types.ObjectId ,ref:"creations" },
  purchase_history: { type:Schema.Types.ObjectId ,ref:"payments"},
  purchased_user:{ type:Schema.Types.ObjectId ,ref:"users"},
  profile:{ type:Schema.Types.ObjectId , ref:"users"},
  owner:{ type:Schema.Types.ObjectId ,ref:"users"},
  commisson:{type:Schema.Types.ObjectId ,ref:"commission_history"},
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false},
},{timestamps:true});

// purchasesSchema.index({product:1,purchased_user:1})

module.exports = mongoose.model("purchases", purchasesSchema);