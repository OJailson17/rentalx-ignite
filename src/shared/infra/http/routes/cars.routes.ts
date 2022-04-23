import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCase/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCase/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '@modules/cars/useCase/listCars/ListCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationsController = new CreateCarSpecificationController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listCarsController.handle);
carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle,
);

export { carsRoutes };
