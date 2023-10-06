import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  clientId: {
    // gets id from Client Schema
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  name: { type: String },
  description: { type: String },
  status: {
    type: String,
    enum: ['Not STarted', 'In Progress', 'Completed'],
  },
});
export const ProjectModel = mongoose.model('Project', ProjectSchema);
