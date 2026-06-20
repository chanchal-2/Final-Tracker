import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';
import dbStore from '../config/dbStore.js';

const router = express.Router();

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role, department, projectId, guideName } = req.body;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long, and include a capital letter, a lowercase letter, a number, and a special character.' });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      let resolvedProjectId = projectId || null;

      // If user is registering as student and enters a guideName, create a project for them
      if (role === 'student' && guideName && !resolvedProjectId) {
        const guideUser = await User.findOne({ 
          name: { $regex: new RegExp('^' + guideName.trim() + '$', 'i') }, 
          role: 'guide' 
        });

        const newProject = await Project.create({
          projectId: `PRJ-${Date.now().toString().slice(-6)}`,
          title: `${name}'s Project`,
          guide: guideName.trim(),
          guideId: guideUser ? guideUser._id : null,
          team: name,
          status: 'Approved',
          progress: 10
        });

        resolvedProjectId = newProject._id;
      }

      const user = await User.create({
        name,
        email,
        password,
        role,
        department,
        projectId: resolvedProjectId
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        projectId: user.projectId,
        token: generateToken(user._id)
      });
    } else {
      // In-memory registration fallback
      const userExists = dbStore.users.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );

      if (userExists) {
        return res.status(400).json({ message: 'User already exists in fallback database' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let resolvedProjectId = projectId || null;

      if (role === 'student' && guideName && !resolvedProjectId) {
        const memGuide = dbStore.users.find(
          u => u.name.toLowerCase() === guideName.trim().toLowerCase() && u.role === 'guide'
        );

        const newProj = {
          _id: 'proj_mem_' + Math.random().toString(36).substr(2, 9),
          projectId: `PRJ-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          title: `${name}'s Project`,
          guide: guideName.trim(),
          guideId: memGuide ? memGuide._id : null,
          team: name,
          status: 'Approved',
          progress: 10,
          milestones: [
            { title: 'Project Proposal Defence', date: 'May 05, 2026', status: 'done', grade: 'A+' },
            { title: 'System Architecture Submission', date: 'May 20, 2026', status: 'active', grade: 'TBD' }
          ]
        };

        if (!dbStore.projects) dbStore.projects = [];
        dbStore.projects.push(newProj);
        resolvedProjectId = newProj._id;
      }

      const newUser = {
        _id: 'user_mem_' + Math.random().toString(36).substr(2, 9),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
        department: department || 'Computer Science',
        projectId: resolvedProjectId
      };

      dbStore.users.push(newUser);

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        projectId: newUser.projectId,
        token: generateToken(newUser._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const formattedEmail = email ? email.trim().toLowerCase() : '';

    if (mongoose.connection.readyState === 1) {
      // Find by email or USN
      const user = await User.findOne({ email: formattedEmail });

      if (user && (await user.matchPassword(password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          projectId: user.projectId,
          token: generateToken(user._id)
        });
      } else {
        return res.status(401).json({ message: 'Invalid email/USN or password' });
      }
    } else {
      // In-memory login fallback
      const user = dbStore.users.find(
        u => u.email.toLowerCase() === formattedEmail
      );

      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          projectId: user.projectId,
          token: generateToken(user._id)
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials (Fallback DB)' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user._id).select('-password');
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      // In protect middleware, req.user is already loaded from memory store
      if (req.user) {
        return res.json(req.user);
      } else {
        return res.status(404).json({ message: 'User not found (Fallback DB)' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
