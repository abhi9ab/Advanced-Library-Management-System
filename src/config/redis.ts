import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.connect().catch(console.error);

export const cacheMiddleware = (key: string, expiresIn = 3600) => {
  return async (req: any, res: any, next: any) => {
    try {
      const cached = await redisClient.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      res.originalJson = res.json;
      res.json = async (data: any) => {
        await redisClient.setEx(key, expiresIn, JSON.stringify(data));
        res.originalJson(data);
      };
      next();
    } catch (error) {
      next();
    }
  };
};