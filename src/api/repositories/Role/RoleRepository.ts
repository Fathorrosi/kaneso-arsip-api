import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { Role } from '@api/models/Role/Role';

@EntityRepository(Role)
export class RoleRepository extends RepositoryBase<Role> {
  public async createRole(data: object) {
    let entity = new Role();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateRole(Role: Role, data: object) {
    Object.assign(Role, data);

    return await this.save(Role);
  }

}
