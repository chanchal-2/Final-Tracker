import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Project from './models/Project.js';
import WorkLog from './models/WorkLog.js';
import dns from 'dns';

dotenv.config();

const seedData = async () => {
  try {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch (dnsErr) {
      console.warn('Could not set custom DNS servers:', dnsErr.message);
    }
    
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/final_tracker_db';
    console.log(`Connecting to database for seeding: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    // Clear existing data
    console.log('Clearing existing database records...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await WorkLog.deleteMany({});

    console.log('Inserting default guide users...');
    const guideRao = await User.create({
      name: 'Dr. Ananya Rao',
      email: 'guide@tracker.com',
      password: 'password123',
      role: 'guide',
      department: 'Computer Science'
    });

    const guideGowda = await User.create({
      name: 'Prof. Rajesh Gowda',
      email: 'gowda@tracker.com',
      password: 'password123',
      role: 'guide',
      department: 'Computer Science'
    });

    const guideMurthy = await User.create({
      name: 'Dr. Srinivas Murthy',
      email: 'murthy@tracker.com',
      password: 'password123',
      role: 'guide',
      department: 'Computer Science'
    });

    console.log('Inserting HOD / Coordinator users...');
    await User.create({
      name: 'Prof. H.R. Gowda',
      email: 'hod@tracker.com',
      password: 'password123',
      role: 'hod',
      department: 'Computer Science'
    });

    await User.create({
      name: 'Prof. H.R. Gowda',
      email: 'coordinator@tracker.com',
      password: 'password123',
      role: 'hod',
      department: 'Computer Science'
    });

    console.log('Inserting projects...');
    const proj1 = await Project.create({
      projectId: 'CSE-04',
      title: 'AI-Powered Water Shortage Predictor',
      guide: 'Dr. Ananya Rao',
      guideId: guideRao._id,
      team: 'Naveen Malviya, Priya Patel, Rahul Kumar',
      status: 'Approved',
      progress: 85,
      milestones: [
        { title: 'Project Proposal Defence', date: 'May 05, 2026', status: 'done', grade: 'A+' },
        { title: 'System Architecture Submission', date: 'May 20, 2026', status: 'done', grade: 'A' },
        { title: 'Weekly Progress Review 01', date: 'June 03, 2026', status: 'done', grade: 'B+' },
        { title: 'Weekly Progress Review 02', date: 'June 15, 2026', status: 'active', grade: 'TBD' },
        { title: 'Mid-term Assessment', date: 'June 28, 2026', status: 'locked', grade: '' }
      ]
    });

    const proj2 = await Project.create({
      projectId: 'CSE-12',
      title: 'Blockchain Smart Contract Escrow',
      guide: 'Prof. Rajesh Gowda',
      guideId: guideGowda._id,
      team: 'Amit M., Vinay T.',
      status: 'Pending',
      progress: 40,
      milestones: [
        { title: 'Project Proposal Defence', date: 'May 05, 2026', status: 'done', grade: 'B' },
        { title: 'System Architecture Submission', date: 'May 20, 2026', status: 'active', grade: 'TBD' },
        { title: 'Weekly Progress Review 01', date: 'June 03, 2026', status: 'locked', grade: '' },
        { title: 'Weekly Progress Review 02', date: 'June 15, 2026', status: 'locked', grade: '' },
        { title: 'Mid-term Assessment', date: 'June 28, 2026', status: 'locked', grade: '' }
      ]
    });

    const proj3 = await Project.create({
      projectId: 'CSE-09',
      title: 'IoT Automated Crop Hydroponics',
      guide: 'Dr. Srinivas Murthy',
      guideId: guideMurthy._id,
      team: 'Sneha P., Kiran R.',
      status: 'Delayed',
      progress: 65,
      milestones: [
        { title: 'Project Proposal Defence', date: 'May 05, 2026', status: 'done', grade: 'A' },
        { title: 'System Architecture Submission', date: 'May 20, 2026', status: 'done', grade: 'B+' },
        { title: 'Weekly Progress Review 01', date: 'June 03, 2026', status: 'active', grade: 'TBD' },
        { title: 'Weekly Progress Review 02', date: 'June 15, 2026', status: 'locked', grade: '' },
        { title: 'Mid-term Assessment', date: 'June 28, 2026', status: 'locked', grade: '' }
      ]
    });

    const proj4 = await Project.create({
      projectId: 'CSE-18',
      title: 'Autonomous Quadcopter Mapping',
      guide: 'Dr. Ananya Rao',
      guideId: guideRao._id,
      team: 'Vikram A., Pooja D.',
      status: 'Approved',
      progress: 90,
      milestones: [
        { title: 'Project Proposal Defence', date: 'May 05, 2026', status: 'done', grade: 'A+' },
        { title: 'System Architecture Submission', date: 'May 20, 2026', status: 'done', grade: 'A+' },
        { title: 'Weekly Progress Review 01', date: 'June 03, 2026', status: 'done', grade: 'A' },
        { title: 'Weekly Progress Review 02', date: 'June 15, 2026', status: 'active', grade: 'TBD' },
        { title: 'Mid-term Assessment', date: 'June 28, 2026', status: 'locked', grade: '' }
      ]
    });

    console.log('Inserting student users and linking to projects...');
    // Default student user with standard student@tracker.com email
    await User.create({
      name: 'Naveen Malviya',
      email: 'student@tracker.com',
      password: 'password123',
      role: 'student',
      projectId: proj1._id,
      department: 'Computer Science'
    });

    // Student user with USN roll number 1RV22CS089
    await User.create({
      name: 'Naveen Malviya',
      email: '1RV22CS089',
      password: 'password123',
      role: 'student',
      projectId: proj1._id,
      department: 'Computer Science'
    });

    console.log('Inserting weekly work logs...');
    await WorkLog.create({
      projectId: proj1._id,
      author: 'Naveen Malviya',
      log: 'Completed Random Forest model training and verified feature importance matrix.',
      date: new Date('2026-06-10')
    });

    await WorkLog.create({
      projectId: proj1._id,
      author: 'Neha S.',
      log: 'Set up Vite + React frontend boilerplate and Tailwind CSS v4 configurations.',
      date: new Date('2026-06-03')
    });

    console.log('Seeding completed successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
