import mongoose from 'mongoose';

const WorkLogSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  log: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const WorkLog = mongoose.model('WorkLog', WorkLogSchema);
export default WorkLog;
