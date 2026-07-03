import { Router } from 'express';

import { LeaderboardEntry } from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res) => {
  const data = await LeaderboardEntry.find().sort({ rank: 1 }).lean();

  res.json({
    resource: 'leaderboard',
    data,
  });
});

export default router;