import mongoose from 'mongoose';

const qualityStepSchema = new mongoose.Schema({
  displayOrder: { type: Number },
  order: { type: Number },
  id: { type: Number },
  step: { type: Number },
  section: { type: String },
  title: { type: String },
  isActive: { type: Boolean, default: true },
  image: { type: mongoose.Schema.Types.Mixed }, // Supports string URL or object { url, alt, ... }
  Image: { type: String },
  url: { type: String },
  img: { type: String },
  src: { type: String }
}, { strict: false, collection: 'websiteheroimages', timestamps: true });

export default mongoose.model('QualityStep', qualityStepSchema);
