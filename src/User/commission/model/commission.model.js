// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commissionSchema = new mongoose.Schema({
  commision_percentage:{ type:Number, default: 10 },
  user:{ type:Schema.Types.ObjectId ,ref:"users"},
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false}
},{timestamps:true});

module.exports = mongoose.model("commission", commissionSchema);