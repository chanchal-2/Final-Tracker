import express from 'express';
import mongoose from 'mongoose';
import WorkLog from '../models/WorkLog.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { protect } from '../middleware/auth.js';
import dbStore from '../config/dbStore.js';

const router = express.Router();

// @desc    Get logs for a project
// @route   GET /api/logs/:projectId
// @access  Private
router.get('/:projectId', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.projectId)) {
      const logs = await WorkLog.find({ projectId: req.params.projectId })
        .sort({ createdAt: -1 });
      return res.json(logs);
    } else {
      // In-memory logs lookup
      const logs = dbStore.logs
        .filter(l => l.projectId === req.params.projectId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      return res.json(logs);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a project log entry
// @route   POST /api/logs/:projectId
// @access  Private (Student, Guide)
router.post('/:projectId', protect, async (req, res) => {
  const { log } = req.body;

  if (!log || !log.trim()) {
    return res.status(400).json({ message: 'Log content is required' });
  }

  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.projectId)) {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      const newLog = await WorkLog.create({
        projectId: req.params.projectId,
        author: req.user.name,
        log: log
      });

      // Determine guide ID to target
      let targetUsers = [];
      if (project.guideId) {
        targetUsers.push(project.guideId);
      } else {
        const guideUser = await User.findOne({ name: project.guide, role: 'guide' });
        if (guideUser) {
          targetUsers.push(guideUser._id);
        }
      }

      // Notify the Guide and HOD about the new worklog
      await Notification.create({
        title: 'New Progress Update',
        message: `${req.user.name} submitted a new progress log for project ${project.projectId}.`,
        type: 'info',
        targetRoles: ['hod'], // all hods
        targetUsers: targetUsers,
        projectId: project._id
      });

      return res.status(201).json(newLog);
    } else {
      // In-memory log posting
      const project = dbStore.projects.find(p => p._id === req.params.projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found in fallback database' });
      }

      const newLog = {
        _id: 'log_mem_' + Math.random().toString(36).substr(2, 9),
        projectId: req.params.projectId,
        author: req.user.name,
        log: log,
        date: new Date()
      };

      dbStore.logs.push(newLog);

      const memGuideUser = dbStore.users.find(u => u.name === project.guide && u.role === 'guide');
      const memTargetUsers = project.guideId 
        ? [project.guideId.toString()] 
        : (memGuideUser ? [memGuideUser._id.toString()] : []);
      memTargetUsers.push('mock-guide-123'); // For UI testing mock-token bypass, ensure the generic mock guide also gets it

      if (!dbStore.notifications) dbStore.notifications = [];
      dbStore.notifications.push({
        _id: 'notif_' + Math.random().toString(36).substr(2, 9),
        title: 'New Progress Update',
        message: `${req.user.name} submitted a new progress log for project ${project.projectId}.`,
        type: 'info',
        targetRoles: ['hod'],
        targetUsers: memTargetUsers,
        projectId: project._id,
        readBy: [],
        createdAt: new Date()
      });

      return res.status(201).json(newLog);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
