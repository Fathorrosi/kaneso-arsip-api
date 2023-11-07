import { Service } from 'typedi';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { RoleRepository } from '@api/repositories/Users/RoleRepository';
import { UserNotFoundException } from '@api/exceptions/Users/UserNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserService {
  constructor(@InjectRepository() private userRepository: UserRepository,@InjectRepository() private roleRepository: RoleRepository,@EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    //
  }

  public async getAll(resourceOptions?: object) {
    const result = await this.userRepository.getManyAndCount(resourceOptions);
    const roles = await this.roleRepository.getMany();
    const users = await Promise.all(result.rows.map(async (user) => {
      const roleName = roles.find(role => role.id === user.role_id)?.name;
      return {
        ...user,
        role_name: roleName,
      };
    }));
    return users;
  }
  

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedUserOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    let user = await this.userRepository.createUser(data);

    this.eventDispatcher.dispatch('onUserCreate', user);

    return user;
  }

  public async updateOneById(id: number, data: object) {
    const user = await this.getRequestedUserOrFail(id);

    return await this.userRepository.updateUser(user, data);
  }

  public async deleteOneById(id: number) {
    return await this.userRepository.delete(id);
  }

  private async getRequestedUserOrFail(id: number, resourceOptions?: object) {
    let user = await this.userRepository.getOneById(id, resourceOptions);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  public async getRoles() {
    return await this.roleRepository.getMany();
  }
}
