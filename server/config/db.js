import mongoose from 'mongoose';
import dns from 'dns';

const connectDB = async () => {
  try {
    // Set custom DNS resolvers to bypass local network DNS failures in resolving MongoDB Atlas SRV records
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch (dnsErr) {
      console.warn('Could not set custom DNS servers:', dnsErr.message);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.log('------------------------------------------------------------');
    console.log('WARNING: MONGODB IS NOT RUNNING OR COULD NOT CONNECT.');
    console.log('Please ensure that MongoDB is running locally on port 27017,');
    console.log('or configure MONGO_URI in server/.env with a valid MongoDB connection string.');
    console.log('------------------------------------------------------------');
    // We do not exit the process so that the Express server can still boot up and
    // the user can see visual instructions/errors in the logs rather than a crashed process.
  }
};

export default connectDB;
