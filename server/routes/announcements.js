import express from 'express';
import mongoose from 'mongoose';
import Notification from '../models/Notification.js';
import { protect, authorize } from '../middleware/auth.js';
import dbStore from '../config/dbStore.js';

const router = express.Router();

// @desc    Get announcement history
// @route   GET /api/announcements/history
// @access  Private (HOD only)
router.get('/history', protect, authorize('hod'), async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const announcements = await Notification.find({
        title: { $regex: '^📣 Announcement' }
      }).sort({ createdAt: -1 });
      return res.json(announcements);
    } else {
      if (!dbStore.notifications) dbStore.notifications = [];
      const announcements = dbStore.notifications
        .filter(n => n.title && n.title.startsWith('📣 Announcement'))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json(announcements);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new global announcement
// @route   POST /api/announcements
// @access  Private (HOD only)
router.post('/', protect, authorize('hod'), async (req, res) => {
  const { title, message, recipient, scheduledFor } = req.body;
  if (!title || !message) {
    return res.status(400).json({ message: 'Please provide a title and message' });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      let roles = [];
      if (recipient === 'all-students') roles = ['student'];
      else if (recipient === 'all-guides') roles = ['guide'];
      else roles = ['student', 'guide'];

      const notification = await Notification.create({
        title: `📣 Announcement: ${title}`,
        message,
        type: 'warning', // yellow warning style makes it stand out
        targetRoles: roles,
        targetUsers: [],
        projectId: null,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null
      });

      return res.status(201).json(notification);
    } else {
      // In-memory fallback
      if (!dbStore.notifications) dbStore.notifications = [];
      const notif = {
        _id: 'notif_' + Math.random().toString(36).substr(2, 9),
        title: `📣 Announcement: ${title}`,
        message,
        type: 'warning',
        targetRoles: roles,
        targetUsers: [],
        projectId: null,
        readBy: [],
        createdAt: new Date(),
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null
      };
      dbStore.notifications.push(notif);

      return res.status(201).json(notif);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
