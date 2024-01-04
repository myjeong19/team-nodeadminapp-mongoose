const mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const articleFileSchema = new Schema({
  article_file_id: {
    type: Number,
    required: true,
  },
  article_id: {
    type: Number,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  file_size: {
    type: Number,
    required: true,
  },
  file_path: {
    type: String,
    required: true,
  },
  file_type: {
    type: String,
    required: false,
  },
  reg_date: {
    type: Date,
    default: Date.now,
  },
  reg_member_id: {
    type: Number,
    required: false,
  },
});

articleFileSchema.plugin(AutoIncrement, { inc_field: 'article_file_id' });

module.exports = mongoose.model('Article_file', articleFileSchema);
