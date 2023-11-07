import { UnauthorizedError } from 'routing-controllers';

export class InvalidCredentials extends UnauthorizedError {
  constructor() {
    super('Email atau password salah, tolong periksa kembali!');
  }
}
