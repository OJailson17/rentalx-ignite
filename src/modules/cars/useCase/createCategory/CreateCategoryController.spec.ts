// import createConnection from 'shared/infra/typeorm';
import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create category controller', () => {
  // beforeEach(() => {});

  it('should be able to create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'new category',
      description: 'new description',
    });

    expect(response.status).toBe(201);
  });
});
