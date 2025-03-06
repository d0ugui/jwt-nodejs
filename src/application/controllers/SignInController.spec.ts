import { SignInUseCase } from '../useCases/SignInUseCase';
import { SignInController } from './SignInController';

const mockedSignInUseCase = {
  execute: vi.fn().mockImplementationOnce(() => {
    throw new Error('Unexpected error');
  }) 
} as unknown as SignInUseCase;

describe('sign-in controller tests', () => {
  test('should throw an unexpected error', async () => {
    const signInController = new SignInController(mockedSignInUseCase);

    const handle = signInController.handle({ 
      body: { email: 'd@d.com', password: '12345678' }, 
      accountId: '1' 
    });

    await expect(handle).rejects.toThrow(new Error('Unexpected error'));
  });
});
