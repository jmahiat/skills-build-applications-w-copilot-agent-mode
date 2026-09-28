import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, min: 0, default: 0 },
    loggedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const User = model('User', userSchema, 'users');
export const Team = model('Team', teamSchema, 'teams');
export const Activity = model('Activity', activitySchema, 'activities');
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema, 'leaderboard');
export const Workout = model('Workout', workoutSchema, 'workouts');