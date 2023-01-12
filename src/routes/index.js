import formsRouter from '../../tests/controllers/forms.js';
import healthCheckRouter from './healthcheck.js';
import responsesRouter from './responses.js';

const router = (app) => {
  // common middleware time logger
  app.use((req, res, next) => {
    next();
  });

  app.use(healthCheckRouter);
  app.use(formsRouter)
  app.use(responsesRouter)

};

export default router;
