import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCase/createCategory/CreateCategoryController';
import { importCategoryController } from '../modules/cars/useCase/importCategory';
import { listCategoriesController } from '../modules/cars/useCase/listCategories';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (req, res) => listCategoriesController.handle(req, res));

categoriesRoutes.post('/import', upload.single('file'), (req, res) =>
  importCategoryController.handle(req, res),
);

export { categoriesRoutes };
