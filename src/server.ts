import express from 'express';

import { CategoriesRoutes } from './routes/category.routes';

const app = express();
app.use(express.json());

app.use('/categories', CategoriesRoutes);

app.listen(8082, () => console.log('Server is running'));
