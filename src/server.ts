import express from 'express';

import { router } from './routes';

const app = express();
app.use(express.json());

// Routes
app.use(router);

app.listen(8082, () => console.log('Server is running'));
