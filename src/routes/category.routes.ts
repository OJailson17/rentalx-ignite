import { Router } from 'express';

import { CategoriesRepository } from '../repositories/categoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const CategoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

CategoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

CategoriesRoutes.get('/', (req, res) => {
  const allCategories = categoriesRepository.list();

  return res.json(allCategories);
});

export { CategoriesRoutes };
