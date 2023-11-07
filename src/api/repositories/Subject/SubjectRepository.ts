import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { Subject } from '@api/models/Subject/Subject';

@EntityRepository(Subject)
export class SubjectRepository extends RepositoryBase<Subject> {
  public async createSubject(data: object) {
    let entity = new Subject();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateSubject(Subject: Subject, data: object) {
    Object.assign(Subject, data);

    return await this.save(Subject);
  }

}
