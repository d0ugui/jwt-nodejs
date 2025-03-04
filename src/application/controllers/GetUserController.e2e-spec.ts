import request from 'supertest';
import { app } from '../../server/app';
import { prismaClient } from '../libs/prismaClient';
import { hash } from 'bcryptjs';

describe('[GET] get user (e2e)', () => {
  beforeAll(async () => {
    await prismaClient.account.create({
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        password: await hash('12345678', 8)
      }
    });
  });

  it('should be able to get user', async () => {
    const auth = await request(app)
      .post('/sign-in')
      .send({
        email: 'john@doe.com',
        password: '12345678'
      });
    
    expect(auth.statusCode).toBe(200);
    expect(auth.body).toEqual({
      accessToken: expect.any(String)
    });

    const response = await request(app)
      .get('/me')
      .set('Authorization', `Bearer ${auth.body.accessToken}`)
      .send({});

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      email: expect.any(String),
      name: expect.any(String)
    });
  });

  it('should throw account-not-found error when token is valid, but the account does not exist', async () => {
    const auth = await request(app)
      .post('/sign-in')
      .send({
        email: 'john@doe.com',
        password: '12345678'
      });
    
    expect(auth.statusCode).toBe(200);
    expect(auth.body).toEqual({
      accessToken: expect.any(String)
    });

    await prismaClient.account.delete({
      where: {
        email: 'john@doe.com'
      }
    });

    const response = await request(app)
      .get('/me')
      .set('Authorization', `Bearer ${auth.body.accessToken}`)
      .send({});

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Account not found.');
  });
});