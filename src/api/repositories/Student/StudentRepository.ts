import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { Student } from '@api/models/Student/Student';

@EntityRepository(Student)
export class StudentRepository extends RepositoryBase<Student> {
  public async createStudent(data: object) {
    let entity = new Student();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateStudent(student: Student, data: object) {
    Object.assign(student, data);

    return await this.save(student);
  }

  public async bulkCreateStudents(data: Object[]) {
    let students: Student[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const item of data) {
      let entity = new Student();

      Object.assign(entity, item);

      students.push(entity);
    }

    return await this.save(students);
  }

}
