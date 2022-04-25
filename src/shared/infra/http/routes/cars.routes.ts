import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCase/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCase/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '@modules/cars/useCase/listCars/ListCarsController';
import { UploadCarImagesController } from '@modules/cars/useCase/uploadCarImages/UploadCarImagesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationsController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listCarsController.handle);
carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle,
);
carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
