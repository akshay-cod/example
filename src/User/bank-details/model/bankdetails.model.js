// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankDetailsSchema = new mongoose.Schema({
  user:{ type:Schema.Types.ObjectId ,ref:"users"},
  bank:[{account_holder_name:{type:String},
          account_number:{type:String},
          account_ifsc:{type:String}
        }],
  upi:[{upi_id:{type:String}}],
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false}
},{timestamps:true});

module.exports = mongoose.model("bank_details", bankDetailsSchema);