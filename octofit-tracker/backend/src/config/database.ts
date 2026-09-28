import mongoose from 'mongoose';

export async function connectDatabase() {
  const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
  return mongoose.connection;
}

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default mongoose.connection;
