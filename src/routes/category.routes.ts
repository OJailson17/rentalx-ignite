import { Router } from 'express';

import { CategoriesRepository } from '../repositories/categoriesRepository';

const CategoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

CategoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

CategoriesRoutes.get('/', (req, res) => {
  const allCategories = categoriesRepository.list();

  return res.json(allCategories);
});

export { CategoriesRoutes };
