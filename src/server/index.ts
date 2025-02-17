import express from 'express';
import { routeAdapter } from './adapters/routeAdapter';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignInController } from '../factories/makeSignInController';

const app = express();
app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.listen(3001, () => {
  console.log('🚀 Server started at http://localhost:3001');
}); 