import { Router } from 'express';

import { User } from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  const data = await User.find().sort({ name: 1 }).lean();

  res.json({
    resource: 'users',
    data,
  });
});

export default router;