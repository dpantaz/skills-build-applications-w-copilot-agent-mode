import mongoose from 'mongoose';

import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@octofit.test',
        role: 'athlete',
        fitnessGoal: 'Improve 10K endurance',
        joinedAt: new Date('2026-01-08'),
      },
      {
        name: 'Jordan Rivera',
        email: 'jordan.rivera@octofit.test',
        role: 'team_captain',
        fitnessGoal: 'Build functional strength',
        joinedAt: new Date('2026-01-14'),
      },
      {
        name: 'Sam Patel',
        email: 'sam.patel@octofit.test',
        role: 'athlete',
        fitnessGoal: 'Increase weekly activity consistency',
        joinedAt: new Date('2026-02-02'),
      },
    ]);

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Morning runners focused on endurance challenges.',
        captainEmail: 'jordan.rivera@octofit.test',
        memberEmails: ['jordan.rivera@octofit.test', 'maya.chen@octofit.test'],
      },
      {
        name: 'Core Crew',
        description: 'Strength and mobility group for balanced training.',
        captainEmail: 'sam.patel@octofit.test',
        memberEmails: ['sam.patel@octofit.test'],
      },
    ]);

    await Activity.insertMany([
      {
        userEmail: 'maya.chen@octofit.test',
        teamName: 'Trail Blazers',
        type: 'Run',
        durationMinutes: 48,
        caloriesBurned: 520,
        activityDate: new Date('2026-07-01T12:30:00.000Z'),
      },
      {
        userEmail: 'jordan.rivera@octofit.test',
        teamName: 'Trail Blazers',
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 430,
        activityDate: new Date('2026-07-02T14:00:00.000Z'),
      },
      {
        userEmail: 'sam.patel@octofit.test',
        teamName: 'Core Crew',
        type: 'Cycling',
        durationMinutes: 62,
        caloriesBurned: 610,
        activityDate: new Date('2026-07-02T22:15:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        rank: 1,
        userEmail: 'sam.patel@octofit.test',
        teamName: 'Core Crew',
        points: 1240,
        weeklyCalories: 2680,
      },
      {
        rank: 2,
        userEmail: 'maya.chen@octofit.test',
        teamName: 'Trail Blazers',
        points: 1185,
        weeklyCalories: 2525,
      },
      {
        rank: 3,
        userEmail: 'jordan.rivera@octofit.test',
        teamName: 'Trail Blazers',
        points: 1090,
        weeklyCalories: 2310,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Endurance Builder 45',
        focusArea: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        recommendedForGoal: 'Improve 10K endurance',
        exercises: ['Dynamic warmup', 'Tempo run intervals', 'Cooldown walk'],
      },
      {
        title: 'Functional Strength Circuit',
        focusArea: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        recommendedForGoal: 'Build functional strength',
        exercises: ['Goblet squats', 'Push press', 'Romanian deadlifts', 'Farmer carries'],
      },
      {
        title: 'Consistency Reset',
        focusArea: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 25,
        recommendedForGoal: 'Increase weekly activity consistency',
        exercises: ['Hip mobility flow', 'Core activation', 'Zone 2 walk'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
