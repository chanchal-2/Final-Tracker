import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const user = await User.findOne({ email: 'naveen@gmail.com' });
  console.log('USER:', user);
  if (user) {
    const isMatch = await user.matchPassword('Naveen@123');
    console.log('matchPassword("Naveen@123"):', isMatch);
    
    const isMatch2 = await user.matchPassword('naveen@123');
    console.log('matchPassword("naveen@123"):', isMatch2);
  }
  process.exit(0);
});
