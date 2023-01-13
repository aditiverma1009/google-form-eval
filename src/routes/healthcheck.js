import { Router } from 'express';

const healthCheckRouter = Router();

healthCheckRouter.get('/ping', (_, response) => {
  try {
    response.status(200).send('Pong!');
  } catch (err) {
    response.status(500).send({ error: 'Something broke!' });
  }
});

export default healthCheckRouter;
