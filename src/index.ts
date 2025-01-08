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
scheduleReminders();

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello</h1>');
});

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});