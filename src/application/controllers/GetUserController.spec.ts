
import { GetUserUseCase } from '../useCases/GetUserUseCase';
import { GetUserController } from './GetUserController';

const mockedGetUserUseCase = {
  execute: vi.fn().mockImplementationOnce(() => {
    throw new Error('Unexpected error');
  }) 
} as unknown as GetUserUseCase;

describe('get-user controller tests', () => {
  test('should throw an unexpected error', async () => {
    const getUserController = new GetUserController(mockedGetUserUseCase);

    const handle = getUserController.handle({ 
      body: { name: 'Douglas', email: 'd@d.com', password: '12345678' }, 
      accountId: '123'
    });

    await expect(handle).rejects.toThrow(new Error('Unexpected error'));
  });
});
