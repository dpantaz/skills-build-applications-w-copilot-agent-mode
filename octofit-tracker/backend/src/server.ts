import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';

app.use(
  cors({
    origin: frontendOrigin,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend running at ${baseUrl}`);
});
