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
  short_description: { type: String, default: null },
  description:{type: String, default: null },
  created_by: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  logo: { type: String, default: null },
  price: { type: Number, default: 0 },
  denominations: { type: [Number], default: [] },
  currency:  {type: String, default: "INR" },
  discount: { type: Number, default: 0 },
  images: {
    type: [imageSchema],
    default: []
  },
  instantDelivery: { type: Boolean, default: true },
  validityPeriod: { type: String, default: 'Lifetime' },
  features: { type: [String], default: [] },
  is_active:{ type: Boolean, default: true },
  is_deleted:{ type: Boolean, default: false}
}, {
  timestamps: true
});

module.exports = mongoose.model('Items', itemsSchema);
