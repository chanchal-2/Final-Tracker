import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import dbStore from '../config/dbStore.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // --- BYPASS MONGODB FOR UI TESTING ---
      if (token.startsWith('mock-token-')) {
        const role = token.split('-')[2]; // e.g. 'mock-token-hod' -> 'hod'
        req.user = {
          _id: `mock-${role}-123`,
          name: `Mock ${role.toUpperCase()}`,
          email: `${role}@projecttracker.edu`,
          role: role,
          department: 'Computer Science'
        };
        return next();
      }
      // -------------------------------------

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');

      // Get user from token (MongoDB or in-memory fallback)
      if (mongoose.connection.readyState === 1) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const memUser = dbStore.users.find(u => u._id === decoded.id);
        if (memUser) {
          const { password, ...userWithoutPassword } = memUser;
          req.user = userWithoutPassword;
        }
      }

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user ? req.user.role : 'none'}) is not authorized to access this resource`
      });
    }
    next();
  };
};
