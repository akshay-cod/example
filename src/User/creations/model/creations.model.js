// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creationsSchema = new mongoose.Schema({
  title: { type: String },
  type: { type: String },
  description:{ type: String },
  banner_img:{ type: String },
  price: { type: Number},
  files: { type:Array },
  purchase_counts: { type:Number },
  created_by:{ type:Schema.Types.ObjectId ,ref:"users"},
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false}
},{timestamps:true});

creationsSchema.index({purchase_counts:1})

module.exports = mongoose.model("creations", creationsSchema);