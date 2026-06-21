import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const users = await User.find({ role: 'student' }, { name: 1, email: 1, uucms: 1 });
  console.log('STUDENT USERS:');
  console.log(users);
  process.exit(0);
});
