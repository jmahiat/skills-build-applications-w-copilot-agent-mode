import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
import { connectDatabase } from '../config/database.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const userData = [
      { name: 'Jamie Rivera', email: 'jamie.rivera@example.com' },
      { name: 'Morgan Chen', email: 'morgan.chen@example.com' },
      { name: 'Alex Okafor', email: 'alex.okafor@example.com' },
    ];
    const users = await Promise.all(
      userData.map(({ email, name }) =>
        User.findOneAndUpdate(
          { email },
          { $set: { email, name } },
          { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        ),
      ),
    );

    const [jamie, morgan, alex] = users;
    const teamData = [
      {
        name: 'Peak Pacers',
        description: 'A steady crew focused on building consistent running habits.',
        members: [jamie._id, morgan._id],
      },
      {
        name: 'North Star Crew',
        description: 'Friends mixing strength, cycling, and recovery days.',
        members: [morgan._id, alex._id],
      },
    ];
    await Promise.all(
      teamData.map(({ name, ...fields }) =>
        Team.findOneAndUpdate(
          { name },
          { $set: { name, ...fields } },
          { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        ),
      ),
    );

    const today = new Date();
    today.setUTCHours(7, 0, 0, 0);
    const activityData = [
      { user: jamie._id, activityType: 'Run', durationMinutes: 38, caloriesBurned: 342, loggedAt: new Date(today.getTime() - 86400000) },
      { user: morgan._id, activityType: 'Cycling', durationMinutes: 52, caloriesBurned: 410, loggedAt: new Date(today.getTime() - 2 * 86400000) },
      { user: alex._id, activityType: 'Strength training', durationMinutes: 45, caloriesBurned: 280, loggedAt: new Date(today.getTime() - 3 * 86400000) },
    ];
    await Promise.all(
      activityData.map(({ user, activityType, loggedAt, ...fields }) =>
        Activity.findOneAndUpdate(
          { user, activityType, loggedAt },
          { $set: { user, activityType, loggedAt, ...fields } },
          { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        ),
      ),
    );

    const leaderboardData = [
      { user: jamie._id, points: 240 },
      { user: morgan._id, points: 195 },
      { user: alex._id, points: 160 },
    ];
    await Promise.all(
      leaderboardData.map(({ user, points }) =>
        LeaderboardEntry.findOneAndUpdate(
          { user },
          { $set: { user, points } },
          { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        ),
      ),
    );

    const workoutData = [
      { name: 'Easy Start Run', description: 'A conversational-pace run with a short warm-up and cooldown.', difficulty: 'beginner', durationMinutes: 30 },
      { name: 'Full Body Basics', description: 'A balanced circuit of bodyweight strength movements.', difficulty: 'beginner', durationMinutes: 35 },
      { name: 'Tempo Ride', description: 'A progressive cycling session with sustained tempo intervals.', difficulty: 'intermediate', durationMinutes: 45 },
    ];
    await Promise.all(
      workoutData.map(({ name, ...fields }) =>
        Workout.findOneAndUpdate(
          { name },
          { $set: { name, ...fields } },
          { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        ),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
