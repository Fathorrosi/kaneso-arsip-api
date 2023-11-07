import { NotFoundError } from 'routing-controllers';

export class PositionNotFoundException extends NotFoundError {
  constructor() {
    super('Position not found!');
  }
}
