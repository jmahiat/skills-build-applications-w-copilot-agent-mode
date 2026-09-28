import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiBaseUrl } from './config/api.js';
import apiRoutes from './routes/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' });
});

app.use('/api', apiRoutes);

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Unable to start the API:', error);
    process.exitCode = 1;
  });