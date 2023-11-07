import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { Staff } from '@api/models/Staff/Staff';

@EntityRepository(Staff)
export class StaffRepository extends RepositoryBase<Staff> {
  public async createStaff(data: object) {
    let entity = new Staff();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateStaff(Staff: Staff, data: object) {
    Object.assign(Staff, data);

    return await this.save(Staff);
  }

}
