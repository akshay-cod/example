const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, default: null },
  slug: { type: String, default: null },
  category_description:{type: String, default: null },
  parent_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null }, // Self-referencing
  level: { type: Number, default: 1 },
  created_by: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  is_active:{ type: Boolean, default: true },
  is_deleted:{ type: Boolean, default: false}
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
