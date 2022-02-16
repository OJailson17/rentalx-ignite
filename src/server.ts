import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }));

app.post('/courses', (req, res) => {
  const { name } = req.body;

  return res.json({ name });
});

app.listen(8082, () => console.log('Server is running'));
