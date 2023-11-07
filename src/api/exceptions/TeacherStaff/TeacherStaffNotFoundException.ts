import { NotFoundError } from 'routing-controllers';

export class TeacherStaffNotFoundException extends NotFoundError {
  constructor() {
    super('Teacher or Staff not found!');
  }
}
