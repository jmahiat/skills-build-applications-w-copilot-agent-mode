import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const router = Router();

router.get('/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

router.get('/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name email').lean());
});

router.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'name email').sort({ loggedAt: -1 }).lean());
});

router.get('/leaderboard/', async (_request, response) => {
  response.json(await LeaderboardEntry.find().populate('user', 'name email').sort({ points: -1 }).lean());
});

router.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

export default router;