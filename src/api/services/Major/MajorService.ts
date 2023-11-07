import { Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { MajorRepository } from '@base/api/repositories/Major/MajorRepository';
import { MajorNotFoundException } from '@base/api/exceptions/Major/MajorNotFoundException';

@Service()
export class MajorService {
  constructor(
    @InjectRepository() private majorRepository: MajorRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.majorRepository.getMany(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedMajorOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    const Major = await this.majorRepository.createMajor(data);

    this.eventDispatcher.dispatch('onMajorCreate', Major);

    return Major;
  }

  public async updateOneById(id: number, data: object) {
    const Major = await this.getRequestedMajorOrFail(id);

    return await this.majorRepository.updateMajor(Major, data);
  }

  public async deleteOneById(id: number) {
    return await this.majorRepository.delete(id);
  }

  private async getRequestedMajorOrFail(id: number, resourceOptions?: object) {
    const Major = await this.majorRepository.getOneById(id);

    if (!Major) {
      throw new MajorNotFoundException();
    }

    return Major;
  }
}
