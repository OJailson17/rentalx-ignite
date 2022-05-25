import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsController } from '@modules/rentals/useCases/listRentals/ListRentalsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsController = new ListRentalsController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get('/user', ensureAuthenticated, listRentalsController.handle);

export { rentalRoutes };
