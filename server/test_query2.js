const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;
  
  const notifications = await db.collection('notifications').find({
    $and: [
      {
        $or: [
          { targetRoles: 'student' }
        ]
      },
      {
        $or: [
          { scheduledFor: null },
          { scheduledFor: { $exists: false } },
          { scheduledFor: { $lte: new Date() } }
        ]
      }
    ]
  }).toArray();
  
  console.log('Count:', notifications.length);
  console.log(notifications);
  process.exit(0);
});
