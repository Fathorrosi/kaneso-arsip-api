import { UnauthorizedError } from 'routing-controllers';

export class UserInactive extends UnauthorizedError {
  constructor() {
    super('Akun anda tidak aktif, silahkan hubungi admin!');
  }
}
