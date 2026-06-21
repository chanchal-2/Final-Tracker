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
    const projRao1 = await Project.create({
      projectId: 'U03AI23S0015',
      uucms: 'U03AI23S0015',
      title: 'AI-Powered Water Shortage Predictor',
      guide: 'Dr. Ananya Rao',
      guideId: guideRao._id,
      team: 'Naveen Malviya',
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

    const projRao2 = await Project.create({
      projectId: 'U03AI23S0017',
      uucms: 'U03AI23S0017',
      title: 'Machine Learning Project',
      guide: 'Dr. Ananya Rao',
      guideId: guideRao._id,
      team: 'Anjali',
      status: 'Pending',
      progress: 40,
      milestones: []
    });

    const projRao3 = await Project.create({
      projectId: 'U03AI23S0025',
      uucms: 'U03AI23S0025',
      title: 'Computer Vision Application',
      guide: 'Dr. Ananya Rao',
      guideId: guideRao._id,
      team: 'Chanchal',
      status: 'Delayed',
      progress: 65,
      milestones: []
    });

    const projRao4 = await Project.create({
      projectId: 'U03AI23S0055',
      uucms: 'U03AI23S0055',
      title: 'Cloud Computing System',
      guide: 'Dr. Ananya Rao',
      guideId: guideRao._id,
      team: 'Jyoti Mishra',
      status: 'Approved',
      progress: 90,
      milestones: []
    });

    const projRao5 = await Project.create({
      projectId: 'U03AI23S0013',
      uucms: 'U03AI23S0013',
      title: 'Data Science Research',
      guide: 'Dr. Ananya Rao',
      guideId: guideRao._id,
      team: 'Pooja',
      status: 'Approved',
      progress: 75,
      milestones: []
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

    console.log('Inserting student users and linking to projects...');
    const studentsData = [
      { name: 'Naveen Malviya', email: 'U03AI23S0015', projId: projRao1._id },
      { name: 'Anjali', email: 'U03AI23S0017', projId: projRao2._id },
      { name: 'Chanchal', email: 'U03AI23S0025', projId: projRao3._id },
      { name: 'Jyoti Mishra', email: 'U03AI23S0055', projId: projRao4._id },
      { name: 'Pooja', email: 'U03AI23S0013', projId: projRao5._id },
    ];
    
    for (const st of studentsData) {
      await User.create({
        name: st.name,
        email: st.email,
        password: 'password123',
        role: 'student',
        projectId: st.projId,
        department: 'Computer Science',
        uucms: st.email
      });
    }

    console.log('Inserting weekly work logs...');
    await WorkLog.create({
      projectId: projRao1._id,
      author: 'Naveen Malviya',
      log: 'Completed Random Forest model training and verified feature importance matrix.',
      date: new Date('2026-06-10')
    });

    await WorkLog.create({
      projectId: projRao2._id,
      author: 'Anjali',
      log: 'Set up frontend boilerplate.',
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
