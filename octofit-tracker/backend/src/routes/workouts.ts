import { Router } from 'express';

import { Workout } from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  const data = await Workout.find().sort({ title: 1 }).lean();

  res.json({
    resource: 'workouts',
    data,
  });
});

export default router;