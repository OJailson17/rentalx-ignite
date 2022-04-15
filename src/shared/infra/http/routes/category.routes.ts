import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCase/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCase/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCase/listCategories/ListCategoriesController';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle);

export { categoriesRoutes };
