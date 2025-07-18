const mongoose = require('mongoose');
const { Schema } = mongoose;


const imageSchema = new Schema({
  type: { type: String, enum: ['main', 'thumbnail', 'gallery'], required: true },
  url: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false }
}, { _id: false });

const itemsSchema = new Schema({
  name: { type: String, default: null },
  slug: { type: String, default: null },
  description:{type: String, default: null },
  created_by: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  price: { type: Number, default: 0 },
  images: {
    type: [imageSchema],
    default: []
  },
  is_active:{ type: Boolean, default: true },
  is_deleted:{ type: Boolean, default: false}
}, {
  timestamps: true
});

module.exports = mongoose.model('Items', itemsSchema);
