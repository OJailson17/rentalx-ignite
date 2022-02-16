import { Router } from 'express';

import { Category } from '../model/Category';

const CategoriesRoutes = Router();

const categories: Category[] = [];

CategoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const category = new Category();

  Object.assign(category, {
    name,
    description,
    created_at: new Date(),
  });

  categories.push(category);

  return res.status(201).json(categories);
});

export { CategoriesRoutes };
