import express from 'express';
import mongoose from 'mongoose';
import Notification from '../models/Notification.js';
import { protect, authorize } from '../middleware/auth.js';
import dbStore from '../config/dbStore.js';

const router = express.Router();

// @desc    Create a new global announcement
// @route   POST /api/announcements
// @access  Private (HOD only)
router.post('/', protect, authorize('hod'), async (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ message: 'Please provide a title and message' });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      const notification = await Notification.create({
        title: `📣 Announcement: ${title}`,
        message,
        type: 'warning', // yellow warning style makes it stand out
        targetRoles: ['student', 'guide'], // Broadcast to all students and guides
        targetUsers: [],
        projectId: null
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
        targetRoles: ['student', 'guide'],
        targetUsers: [],
        projectId: null,
        readBy: [],
        createdAt: new Date()
      };
      dbStore.notifications.push(notif);

      return res.status(201).json(notif);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
