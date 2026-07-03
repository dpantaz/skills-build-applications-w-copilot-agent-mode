import { Schema, model, models } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true },
    userEmail: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    weeklyCalories: { type: Number, required: true },
  },
  { timestamps: true }
);

export const LeaderboardEntry =
  models.LeaderboardEntry || model('LeaderboardEntry', leaderboardEntrySchema);