import { z, ZodError } from 'zod';
import { IController, IRequest, IResponse } from '../interfaces/IController';
import { SignUpUseCase } from '../useCases/SignUpUseCase';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, email, password } = schema.parse(body);
      
      const account = await this.signUpUseCase.execute({ name, email, password});

      return {
        statusCode: 201,
        body: account
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: 'This email is already in use.'
          }
        };
      }

      throw error;
    }
  }
}