import { NotFoundError } from 'routing-controllers';

export class SubjectNotFoundException extends NotFoundError {
  constructor() {
    super('Subject not found!');
  }
}
