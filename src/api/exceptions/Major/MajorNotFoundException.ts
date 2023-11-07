import { NotFoundError } from 'routing-controllers';

export class MajorNotFoundException extends NotFoundError {
  constructor() {
    super('Major not found!');
  }
}
