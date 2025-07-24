const mongoose = require('mongoose');
const { Schema } = mongoose;

const userReviewsSchema = new Schema({
  item_id: { type: Schema.Types.ObjectId, ref: 'Items', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: null },
  images:[{
    type: String,
    default: null
  }],
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false }
}, {
  timestamps:true
});

module.exports = mongoose.model('user_reviews', userReviewsSchema);
