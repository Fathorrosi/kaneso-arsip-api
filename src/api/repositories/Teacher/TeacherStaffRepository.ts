import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { TeacherStaff } from '@base/api/models/TeacherStaff/TeacherStaff';

@EntityRepository(TeacherStaff)
export class TeacherStaffRepository extends RepositoryBase<TeacherStaff> {
  public async createTeacherStaff(data: object) {
    let entity = new TeacherStaff();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateTeacher(TeacherStaff: TeacherStaff, data: object) {
    Object.assign(TeacherStaff, data);

    return await this.save(TeacherStaff);
  }

  public async bulkCreate(data: Object[]) {
    let teacherStaffs: TeacherStaff[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const item of data) {
      let entity = new TeacherStaff();

      Object.assign(entity, item);

      teacherStaffs.push(entity);
    }

    return await this.save(teacherStaffs);
  }

}
