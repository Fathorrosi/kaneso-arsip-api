import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { Position } from '@api/models/Position/Position';

@EntityRepository(Position)
export class PositionRepository extends RepositoryBase<Position> {
  public async createPosition(data: object) {
    let entity = new Position();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updatePosition(Position: Position, data: object) {
    Object.assign(Position, data);

    return await this.save(Position);
  }

}
