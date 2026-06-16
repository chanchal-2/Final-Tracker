import express from 'express';
import mongoose from 'mongoose';
import Notification from '../models/Notification.js';
import { protect, authorize } from '../middleware/auth.js';
import dbStore from '../config/dbStore.js';

const router = express.Router();

// @desc    Create a new notification
// @route   POST /api/notifications
// @access  Private (HOD / Guide)
router.post('/', protect, async (req, res) => {
  try {
    const { title, message, type, targetRoles, targetUsers, projectId } = req.body;
    
    if (mongoose.connection.readyState === 1) {
      const newNotification = await Notification.create({
        title,
        message,
        type: type || 'info',
        targetRoles: targetRoles || [],
        targetUsers: targetUsers || [],
        projectId: projectId || null,
        readBy: []
      });
      return res.status(201).json(newNotification);
    } else {
      // In-memory fallback
      if (!dbStore.notifications) dbStore.notifications = [];
      const newNotification = {
        _id: Date.now().toString(),
        title,
        message,
        type: type || 'info',
        targetRoles: targetRoles || [],
        targetUsers: targetUsers || [],
        projectId: projectId || null,
        readBy: [],
        createdAt: new Date().toISOString()
      };
      dbStore.notifications.push(newNotification);
      return res.status(201).json(newNotification);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all relevant notifications for the logged-in user
// @route   GET /api/notifications
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Fetch notifications where:
      // 1. targetRoles includes user.role
      // 2. OR targetUsers includes user._id
      // Only add targetUsers check if the ID is a valid ObjectId to prevent CastErrors
      const userOrConditions = [{ targetRoles: req.user.role }];
      if (mongoose.Types.ObjectId.isValid(req.user._id)) {
        userOrConditions.push({ targetUsers: req.user._id });
      }

      const notifications = await Notification.find({
        $and: [
          { $or: userOrConditions },
          {
            $or: [
              { scheduledFor: null },
              { scheduledFor: { $exists: false } },
              { scheduledFor: { $lte: new Date() } }
            ]
          }
        ]
      }).sort({ createdAt: -1 });

      // Map over them to add an `isRead` flag for this specific user
      const userNotifications = notifications.map(notif => {
        const notifObj = notif.toObject();
        notifObj.isRead = notifObj.readBy.some(id => id.toString() === req.user._id.toString());
        return notifObj;
      });

      return res.json(userNotifications);
    } else {
      // In-memory fallback
      if (!dbStore.notifications) dbStore.notifications = [];
      const notifications = dbStore.notifications
        .filter(n => {
          const roleMatch = n.targetRoles.includes(req.user.role) || n.targetUsers.includes(req.user._id);
          const scheduleMatch = !n.scheduledFor || new Date(n.scheduledFor) <= new Date();
          return roleMatch && scheduleMatch;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      const userNotifications = notifications.map(notif => ({
        ...notif,
        isRead: notif.readBy.includes(req.user._id.toString())
      }));

      return res.json(userNotifications);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Mark a single notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }

      // Add user to readBy if not already there
      if (!notification.readBy.includes(req.user._id)) {
        notification.readBy.push(req.user._id);
        await notification.save();
      }

      return res.json({ message: 'Marked as read' });
    } else {
      // In-memory fallback
      if (!dbStore.notifications) dbStore.notifications = [];
      const notification = dbStore.notifications.find(n => n._id === req.params.id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }

      if (!notification.readBy.includes(req.user._id.toString())) {
        notification.readBy.push(req.user._id.toString());
      }

      return res.json({ message: 'Marked as read' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
router.put('/read-all', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const notifications = await Notification.find({
        $or: [
          { targetRoles: req.user.role },
          { targetUsers: req.user._id }
        ]
      });

      for (let notif of notifications) {
        if (!notif.readBy.includes(req.user._id)) {
          notif.readBy.push(req.user._id);
          await notif.save();
        }
      }

      return res.json({ message: 'All marked as read' });
    } else {
      // In-memory fallback
      if (!dbStore.notifications) dbStore.notifications = [];
      const notifications = dbStore.notifications.filter(
        n => n.targetRoles.includes(req.user.role) || n.targetUsers.includes(req.user._id)
      );

      notifications.forEach(notif => {
        if (!notif.readBy.includes(req.user._id.toString())) {
          notif.readBy.push(req.user._id.toString());
        }
      });

      return res.json({ message: 'All marked as read' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
