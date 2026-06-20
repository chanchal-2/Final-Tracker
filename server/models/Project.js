import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'success', 'warning', 'error'], default: 'info' },
  isRead: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const FeedbackSchema = new mongoose.Schema({
  guideName: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const MilestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['done', 'active', 'locked'],
    default: 'locked'
  },
  grade: {
    type: String,
    default: ''
  }
});

const ProjectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  uucms: {
    type: String,
    trim: true,
    default: ''
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  guide: {
    type: String,
    required: true,
    trim: true
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  team: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Approved', 'Pending', 'Delayed', 'At Risk'],
    default: 'Pending'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 10
  },
  milestones: {
    type: [MilestoneSchema],
    default: [
      { title: 'Project Proposal Defence', date: 'May 05, 2026', status: 'done', grade: 'A+' },
      { title: 'System Architecture Submission', date: 'May 20, 2026', status: 'done', grade: 'A' },
      { title: 'Weekly Progress Review 01', date: 'June 03, 2026', status: 'done', grade: 'B+' },
      { title: 'Weekly Progress Review 02', date: 'June 15, 2026', status: 'active', grade: 'TBD' },
      { title: 'Mid-term Assessment', date: 'June 28, 2026', status: 'locked', grade: '' }
    ]
  },
  documents: {
    type: [DocumentSchema],
    default: []
  },
  notifications: {
    type: [NotificationSchema],
    default: [
      { title: 'Welcome', message: 'Welcome to your ProjectTracker student portal!', type: 'info', date: new Date() }
    ]
  },
  feedback: {
    type: [FeedbackSchema],
    default: []
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
