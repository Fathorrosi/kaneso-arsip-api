import { Service } from 'typedi';
import { DepartmentRepository } from '@base/api/repositories/Department/DepartmentRepository';
import { DepartmentNotFoundException } from '@api/exceptions/Department/DepartmentNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class DepartmentService {
  constructor(
    @InjectRepository() private DepartmentRepository: DepartmentRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.DepartmentRepository.getMany(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedDepartmentOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    const Department = await this.DepartmentRepository.createDepartment(data);

    this.eventDispatcher.dispatch('onDepartmentCreate', Department);

    return Department;
  }

  public async updateOneById(id: number, data: object) {
    const Department = await this.getRequestedDepartmentOrFail(id);

    return await this.DepartmentRepository.updateDepartment(Department, data);
  }

  public async deleteOneById(id: number) {
    return await this.DepartmentRepository.delete(id);
  }

  private async getRequestedDepartmentOrFail(id: number, resourceOptions?: object) {
    const Department = await this.DepartmentRepository.getOneById(id);

    if (!Department) {
      throw new DepartmentNotFoundException();
    }

    return Department;
  }
}
