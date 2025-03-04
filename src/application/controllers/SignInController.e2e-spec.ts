import request from 'supertest';
import { app } from '../../server/app';
import { prismaClient } from '../libs/prismaClient';
import { hash } from 'bcryptjs';

describe('[POST] sign-in (e2e)', () => {
  beforeAll(async () => {
    await prismaClient.account.create({
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        password: await hash('12345678', 8)
      }
    });
  });

  it('should be able to sign-in', async () => {
    const response = await request(app)
      .post('/sign-in')
      .send({
        email: 'john@doe.com',
        password: '12345678'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String) 
    });
  });

  it('should throw zod-error when password size is less than 8', async () => {
    const response = await request(app)
      .post('/sign-in')
      .send({
        email: 'john@doe.com',
        password: '1234567'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body[0].code).toBe('too_small');
  });

  it('should throw invalid-credentials error when email is invalid', async () => {
    const response = await request(app)
      .post('/sign-in')
      .send({
        email: 'john@do.com',
        password: '12345678'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Invalid credentials.');
  });

  it('should throw invalid-credentials error when password is invalid', async () => {
    const response = await request(app)
      .post('/sign-in')
      .send({
        email: 'john@doe.com',
        password: '12345679'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Invalid credentials.');
  });
});