// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new mongoose.Schema({
  friend_requested_user:{ type:Schema.Types.ObjectId ,ref:"users" },
  users: [{type:Schema.Types.ObjectId ,ref:"users"}],
  is_requested:{ type:Boolean, default:true },
  is_accepted: { type:Boolean, default:false },
  is_friends:{ type:Boolean, default:false },
  is_unfriended:{ type:Boolean, default:false },
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false}
},{timestamps:true});

module.exports = mongoose.model("friend", friendsSchema);