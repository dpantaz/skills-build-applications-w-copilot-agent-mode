import { Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    captainEmail: { type: String, required: true },
    memberEmails: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const Team = models.Team || model('Team', teamSchema);