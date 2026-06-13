import express from 'express';
import mongoose from 'mongoose';
import WorkLog from '../models/WorkLog.js';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';
import dbStore from '../config/dbStore.js';

const router = express.Router();

// @desc    Get logs for a project
// @route   GET /api/logs/:projectId
// @access  Private
router.get('/:projectId', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
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
    if (mongoose.connection.readyState === 1) {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      const newLog = await WorkLog.create({
        projectId: req.params.projectId,
        author: req.user.name,
        log: log
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
      return res.status(201).json(newLog);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
