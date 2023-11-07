import { Service } from 'typedi';
import { SubjectRepository } from '@base/api/repositories/Subject/SubjectRepository';
import { SubjectNotFoundException } from '@api/exceptions/Subject/SubjectNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class SubjectService {
  constructor(
    @InjectRepository() private SubjectRepository: SubjectRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.SubjectRepository.getMany(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedSubjectOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    const Subject = await this.SubjectRepository.createSubject(data);

    this.eventDispatcher.dispatch('onSubjectCreate', Subject);

    return Subject;
  }

  public async updateOneById(id: number, data: object) {
    const Subject = await this.getRequestedSubjectOrFail(id);

    return await this.SubjectRepository.updateSubject(Subject, data);
  }

  public async deleteOneById(id: number) {
    return await this.SubjectRepository.delete(id);
  }

  private async getRequestedSubjectOrFail(id: number, resourceOptions?: object) {
    const Subject = await this.SubjectRepository.getOneById(id);

    if (!Subject) {
      throw new SubjectNotFoundException();
    }

    return Subject;
  }
}
