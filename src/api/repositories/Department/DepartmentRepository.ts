import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { Department } from '@api/models/Department/Department';

@EntityRepository(Department)
export class DepartmentRepository extends RepositoryBase<Department> {
  public async createDepartment(data: object) {
    let entity = new Department();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateDepartment(Department: Department, data: object) {
    Object.assign(Department, data);

    return await this.save(Department);
  }

}
