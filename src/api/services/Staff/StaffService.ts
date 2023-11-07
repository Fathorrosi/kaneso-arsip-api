import { Service } from 'typedi';
import { StaffRepository } from '@base/api/repositories/Staff/StaffRepository';
import { StaffNotFoundException } from '@api/exceptions/Staff/StaffNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class StaffService {
  constructor(
    @InjectRepository() private StaffRepository: StaffRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.StaffRepository.getManyAndCount(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedStaffOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    const Staff = await this.StaffRepository.createStaff(data);

    this.eventDispatcher.dispatch('onStaffCreate', Staff);

    return Staff;
  }

  public async updateOneById(id: number, data: object) {
    const Staff = await this.getRequestedStaffOrFail(id);

    return await this.StaffRepository.updateStaff(Staff, data);
  }

  public async deleteOneById(id: number) {
    return await this.StaffRepository.delete(id);
  }

  private async getRequestedStaffOrFail(id: number, resourceOptions?: object) {
    const Staff = await this.StaffRepository.getOneById(id);

    if (!Staff) {
      throw new StaffNotFoundException();
    }

    return Staff;
  }
}
