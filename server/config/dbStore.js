import bcrypt from 'bcryptjs';

// Global in-memory state fallback
const dbStore = {
  users: [],
  projects: [],
  logs: []
};

// Seed initial in-memory data
const seedInMemoryData = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  dbStore.users = [
    {
      _id: 'user_student_1',
      name: 'Rajesh Kumar',
      email: 'student@tracker.com',
      password: hashedPassword,
      role: 'student',
      projectId: 'proj_cse_04',
      department: 'Computer Science'
    },
    {
      _id: 'user_student_2',
      name: 'Rajesh Kumar',
      email: '1rv22cs089',
      password: hashedPassword,
      role: 'student',
      projectId: 'proj_cse_04',
      department: 'Computer Science'
    },
    {
      _id: 'user_guide_rao',
      name: 'Dr. Ananya Rao',
      email: 'guide@tracker.com',
      password: hashedPassword,
      role: 'guide',
      department: 'Computer Science'
    },
    {
      _id: 'user_guide_gowda',
      name: 'Prof. Rajesh Gowda',
      email: 'gowda@tracker.com',
      password: hashedPassword,
      role: 'guide',
      department: 'Computer Science'
    },
    {
      _id: 'user_guide_murthy',
      name: 'Dr. Srinivas Murthy',
      email: 'murthy@tracker.com',
      password: hashedPassword,
      role: 'guide',
      department: 'Computer Science'
    },
    {
      _id: 'user_hod',
      name: 'Prof. H.R. Gowda',
      email: 'hod@tracker.com',
      password: hashedPassword,
      role: 'hod',
      department: 'Computer Science'
    },
    {
      _id: 'user_coordinator',
      name: 'Prof. H.R. Gowda',
      email: 'coordinator@tracker.com',
      password: hashedPassword,
      role: 'hod',
      department: 'Computer Science'
    }
  ];

  dbStore.projects = [
    {
      _id: 'proj_cse_04',
      projectId: 'CSE-04',
      title: 'AI-Powered Water Shortage Predictor',
      guide: 'Dr. Ananya Rao',
      guideId: 'user_guide_rao',
      team: 'Rajesh Kumar, Neha S.',
      status: 'Approved',
      progress: 85,
      milestones: [
        { title: 'Project Proposal Defence', date: 'May 05, 2026', status: 'done', grade: 'A+' },
        { title: 'System Architecture Submission', date: 'May 20, 2026', status: 'done', grade: 'A' },
        { title: 'Weekly Progress Review 01', date: 'June 03, 2026', status: 'done', grade: 'B+' },
        { title: 'Weekly Progress Review 02', date: 'June 15, 2026', status: 'active', grade: 'TBD' },
        { title: 'Mid-term Assessment', date: 'June 28, 2026', status: 'locked', grade: '' }
      ]
    },
    {
      _id: 'proj_cse_12',
      projectId: 'CSE-12',
      title: 'Blockchain Smart Contract Escrow',
      guide: 'Prof. Rajesh Gowda',
      guideId: 'user_guide_gowda',
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
    },
    {
      _id: 'proj_cse_09',
      projectId: 'CSE-09',
      title: 'IoT Automated Crop Hydroponics',
      guide: 'Dr. Srinivas Murthy',
      guideId: 'user_guide_murthy',
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
    },
    {
      _id: 'proj_cse_18',
      projectId: 'CSE-18',
      title: 'Autonomous Quadcopter Mapping',
      guide: 'Dr. Ananya Rao',
      guideId: 'user_guide_rao',
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
    },
    // ---- Mock Projects for GuideDashboard testing ----
    {
      _id: 'proj_cse_04',
      projectId: 'CSE-2026-001',
      title: 'AI-Powered Capstone Project Tracker',
      guide: 'Dr. Ananya Rao',
      guideId: 'user_guide_rao',
      team: 'Naveen Malviya',
      status: 'Approved',
      progress: 72,
      milestones: []
    },
    {
      _id: 'mock-proj-002',
      projectId: 'CSE-2026-002',
      title: 'Smart Campus Navigation System',
      guide: 'Dr. Ananya Rao',
      guideId: 'user_guide_rao',
      team: 'Ananya Singh',
      status: 'Approved',
      progress: 58,
      milestones: []
    },
    {
      _id: 'mock-proj-003',
      projectId: 'CSE-2026-003',
      title: 'Blockchain-Based Certificate Verification',
      guide: 'Dr. Ananya Rao',
      guideId: 'user_guide_rao',
      team: 'Rohan Mehta',
      status: 'Delayed',
      progress: 35,
      milestones: []
    },
    {
      _id: 'mock-proj-004',
      projectId: 'CSE-2026-004',
      title: 'Predictive Health Monitoring Dashboard',
      guide: 'Dr. Ananya Rao',
      guideId: 'user_guide_rao',
      team: 'Meera Joshi',
      status: 'Pending',
      progress: 20,
      milestones: []
    },
    {
      _id: 'mock-proj-005',
      projectId: 'CSE-2026-005',
      title: 'E-Learning Platform with Adaptive Quizzes',
      guide: 'Dr. Ananya Rao',
      guideId: 'user_guide_rao',
      team: 'Deepak Verma',
      status: 'At Risk',
      progress: 15,
      milestones: []
    }
  ];

  dbStore.logs = [
    {
      _id: 'log_1',
      projectId: 'proj_cse_04',
      author: 'Rajesh Kumar',
      log: 'Completed Random Forest model training and verified feature importance matrix.',
      date: new Date('2026-06-10')
    },
    {
      _id: 'log_2',
      projectId: 'proj_cse_04',
      author: 'Neha S.',
      log: 'Set up Vite + React frontend boilerplate and Tailwind CSS v4 configurations.',
      date: new Date('2026-06-03')
    }
  ];
};

seedInMemoryData();

export default dbStore;
