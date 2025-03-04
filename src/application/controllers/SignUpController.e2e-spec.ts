import request from 'supertest';
import { app } from '../../server/app';
import { prismaClient } from '../libs/prismaClient';

describe('sign-up (e2e)', () =>{
  it('should be able to sign-up', async () => {
    const response = await request(app)
      .post('/sign-up')
      .send({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '12345678'
      });

    expect(response.statusCode).toBe(201);

    const account = await prismaClient.account.findUnique({
      where: {
        email: 'john@doe.com'
      }
    });

    expect(account).toBeTruthy();
  });
});