import { NotFoundError } from 'routing-controllers';

export class DepartmentNotFoundException extends NotFoundError {
  constructor() {
    super('Department not found!');
  }
}
