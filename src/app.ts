import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { apiLimiter } from './middlewares/rateLimiter';
import { scheduleReminders } from './services/reminder.service';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiLimiter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Hello :) This is a library management server" });
});

app.use('/api', routes);

scheduleReminders();

export default app;