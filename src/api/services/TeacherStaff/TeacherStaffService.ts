import { Service } from 'typedi';
import { TeacherStaffRepository } from '@base/api/repositories/Teacher/TeacherStaffRepository';
import { TeacherStaffNotFoundException } from '@base/api/exceptions/TeacherStaff/TeacherStaffNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PositionRepository } from '@base/api/repositories/Position/PositionRepository';
import { SubjectRepository } from '@base/api/repositories/Subject/SubjectRepository';
import { DepartmentRepository } from '@base/api/repositories/Department/DepartmentRepository';

@Service()
export class TeacherStaffService {
  constructor(
    @InjectRepository() private TeacherStaffRepository: TeacherStaffRepository,
    @InjectRepository() private positionRepository: PositionRepository,
    @InjectRepository() private subjectRepository: SubjectRepository,
    @InjectRepository() private departmentRepository: DepartmentRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.TeacherStaffRepository.getMany(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedTeacherOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    const TeacherStaff = await this.TeacherStaffRepository.createTeacherStaff(data);

    this.eventDispatcher.dispatch('onTeacherCreate', TeacherStaff);

    return TeacherStaff;
  }

  public async updateOneById(id: number, data: object) {
    const TeacherStaff = await this.getRequestedTeacherOrFail(id);

    return await this.TeacherStaffRepository.updateTeacher(TeacherStaff, data);
  }

  public async deleteOneById(id: number) {
    return await this.TeacherStaffRepository.delete(id);
  }

  private async getRequestedTeacherOrFail(id: number, resourceOptions?: object) {
    const TeacherStaff = await this.TeacherStaffRepository.getOneById(id);

    if (!TeacherStaff) {
      throw new TeacherStaffNotFoundException();
    }

    return TeacherStaff;
  }

  public async bulkCreate(data: object[]) {
    const teachers = await this.TeacherStaffRepository.bulkCreate(data);
    const positions = await this.positionRepository.getMany();
    const subjects = await this.subjectRepository.getMany();
    const departments = await this.departmentRepository.getMany();
    return await Promise.all(teachers.map(async (teacher) => {
      const positionName = positions.find(position => position.id === teacher.position_id)?.name;
      const subjectName = subjects.find(subject => subject.id === teacher.subject_id)?.name;
      const departmentName = departments.find(department => department.id === teacher.department_id)?.name;
      return {
        ...teacher,
        position_name: positionName,
        subject_name: subjectName,
        department_name: departmentName,
      };
    }));
  }
}
