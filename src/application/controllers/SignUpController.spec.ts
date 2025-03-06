
import { SignUpUseCase } from '../useCases/SignUpUseCase';
import { SignUpController } from './SignUpController';

const mockedSignUpUseCase = {
  execute: vi.fn().mockImplementationOnce(() => {
    throw new Error('Unexpected error');
  }) 
} as unknown as SignUpUseCase;

describe('sign-up controller tests', () => {
  test('should throw an unexpected error', async () => {
    const signUpController = new SignUpController(mockedSignUpUseCase);

    const handle = signUpController.handle({ 
      body: { name: 'Douglas', email: 'd@d.com', password: '12345678' }, 
      accountId: undefined
    });

    await expect(handle).rejects.toThrow(new Error('Unexpected error'));
  });
});
