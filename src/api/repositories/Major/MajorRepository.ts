import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { Major } from '@base/api/models/Major/Major';

@EntityRepository(Major)
export class MajorRepository extends RepositoryBase<Major> {
  public async createMajor(data: object) {
    let entity = new Major();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateMajor(Major: Major, data: object) {
    Object.assign(Major, data);

    return await this.save(Major);
  }

}
