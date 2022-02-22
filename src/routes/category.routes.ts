import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCase/createCategory';
import { listCategoriesController } from '../modules/cars/useCase/listCategories';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', (req, res) => createCategoryController.handle(req, res));

categoriesRoutes.get('/', (req, res) => listCategoriesController.handle(req, res));

categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
  const { file } = req;

  console.log(file);

  return res.send();
});

export { categoriesRoutes };
