import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['info', 'success', 'warning', 'error'],
    default: 'info'
  },
  // To broadcast to all users of a specific role
  targetRoles: {
    type: [String],
    enum: ['student', 'guide', 'hod'],
    default: []
  },
  // To target specific users directly
  targetUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  // To link an action directly to a project
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    default: null
  },
  // Track which users have marked this notification as read
  readBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  }
}, {
  timestamps: true
});

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
