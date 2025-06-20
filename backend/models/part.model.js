import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  item: {
    type: String,
    required: true
  },
  product_image: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    default: null
  },
  IS: {
    type: String,
    default: null
  },
  BS: {
    type: String,
    default: null
  },
  ISO: {
    type: String,
    default: null
  },
  DIN: {
    type: String,
    default: null
  },
  ASTM: {
    type: String,
    default: null
  },
  ANSI: {
    type: String,
    default: null
  },
  JIS: {
    type: String,
    default: null
  }
});

const Part = mongoose.model('Part', partSchema);

export default Part;