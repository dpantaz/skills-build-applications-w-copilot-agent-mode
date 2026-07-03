import { Router } from 'express';

import { Activity } from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const data = await Activity.find().sort({ activityDate: -1 }).lean();

  res.json({
    resource: 'activities',
    data,
  });
});

export default router;