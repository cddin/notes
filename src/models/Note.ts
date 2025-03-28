import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
noteSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Check if the model exists before creating a new one
const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

export default Note; 