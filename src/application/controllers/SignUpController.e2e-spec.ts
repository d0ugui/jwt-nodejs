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

  it('should throw zod-error when email has invalid format', async () => {
    const response = await request(app)
      .post('/sign-up')
      .send({
        name: 'John Doe',
        email: 'john.doe.com',
        password: '12345678'
      });
  
    expect(response.statusCode).toBe(400);
    expect(response.body[0].code).toBe('invalid_string');
  });

  it('should throw account-already-exists when email is already in use', async () => {
    await request(app)
      .post('/sign-up')
      .send({
        name: 'John Doe 1',
        email: 'john@doe1.com',
        password: '12345678'
      });

    const response = await request(app)
      .post('/sign-up')
      .send({
        name: 'John Doe 1',
        email: 'john@doe1.com',
        password: '12345678'
      });
  
    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBe('This email is already in use.');
  });
});