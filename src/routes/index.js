import healthCheckRouter from './healthcheck.js';

const router = (app) => {
  // common middleware time logger
  app.use((req, res, next) => {
    next();
  });

  app.use(healthCheckRouter);
};

export default router;
