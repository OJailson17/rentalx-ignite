import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import '@shared/container';
import { AppError } from '@shared/errors/AppError';
// Database
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

createConnection();
const app = express();
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(8082, () => console.log('Server is running'));
