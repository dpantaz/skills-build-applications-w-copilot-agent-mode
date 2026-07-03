import { Router } from 'express';

import { Team } from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const data = await Team.find().sort({ name: 1 }).lean();

  res.json({
    resource: 'teams',
    data,
  });
});

export default router;