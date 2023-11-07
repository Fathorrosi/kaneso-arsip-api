import { Service } from 'typedi';
import { PositionRepository } from '@base/api/repositories/Position/PositionRepository';
import { PositionNotFoundException } from '@base/api/exceptions/Position/PostitionNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class PositionService {
  constructor(
    @InjectRepository() private PositionRepository: PositionRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.PositionRepository.getMany(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedPositionOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    const Position = await this.PositionRepository.createPosition(data);

    this.eventDispatcher.dispatch('onPositionCreate', Position);

    return Position;
  }

  public async updateOneById(id: number, data: object) {
    const Position = await this.getRequestedPositionOrFail(id);

    return await this.PositionRepository.updatePosition(Position, data);
  }

  public async deleteOneById(id: number) {
    return await this.PositionRepository.delete(id);
  }

  private async getRequestedPositionOrFail(id: number, resourceOptions?: object) {
    const Position = await this.PositionRepository.getOneById(id);

    if (!Position) {
      throw new PositionNotFoundException();
    }

    return Position;
  }
}
