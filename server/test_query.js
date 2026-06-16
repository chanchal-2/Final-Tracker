const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;
  const targetRole = 'student';
  const notifications = await db.collection('notifications').find({
    targetRoles: targetRole
  }).toArray();
  
  console.log('Count:', notifications.length);
  console.log(notifications);
  process.exit(0);
});
