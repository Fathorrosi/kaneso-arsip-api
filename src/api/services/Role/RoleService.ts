import { Service } from 'typedi';
import { RoleRepository } from '@base/api/repositories/Role/RoleRepository';
import { RoleNotFoundException } from '@api/exceptions/Role/RoleNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class RoleService {
  constructor(
    @InjectRepository() private RoleRepository: RoleRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.RoleRepository.getManyAndCount(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedRoleOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    const Role = await this.RoleRepository.createRole(data);

    this.eventDispatcher.dispatch('onRoleCreate', Role);

    return Role;
  }

  public async updateOneById(id: number, data: object) {
    const Role = await this.getRequestedRoleOrFail(id);

    return await this.RoleRepository.updateRole(Role, data);
  }

  public async deleteOneById(id: number) {
    return await this.RoleRepository.delete(id);
  }

  private async getRequestedRoleOrFail(id: number, resourceOptions?: object) {
    const Role = await this.RoleRepository.getOneById(id);

    if (!Role) {
      throw new RoleNotFoundException();
    }

    return Role;
  }
}
