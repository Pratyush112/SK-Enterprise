import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Series: {
    type: String,
    default: 'N/A'
  },
  Application: {
    type: String,
    required: true
  },
  Standard: {
    type: String,
    default: 'N/A'
  },
  Mounting: {
    type: String,
    default: 'N/A'
  },
  Sizes: {
    type: String,
    default: 'N/A'
  },
  Sealing: {
    type: String,
    default: 'N/A'
  },
  Water: {
    type: String,
    default: 'N/A'
  },
  Leakage_Parameter: {
    type: String,
    default: 'N/A'
  },
  Spacing_Between_Bars: {
    type: String,
    default: 'N/A'
  },
  Single_Piece_Width: {
    type: String,
    default: 'N/A'
  },
  Single_Piece_Height: {
    type: String,
    default: 'N/A'
  },
  Actuation: {
    type: String,
    default: 'N/A'
  },
  Materials_of_construction: {
    type: String,
    default: 'N/A'
  },
  Image: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;