import { Service } from 'typedi';
import { StudentRepository } from '@base/api/repositories/Student/StudentRepository';
import { StudentNotFoundException } from '@api/exceptions/Student/StudentNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { MajorRepository } from '@base/api/repositories/Major/MajorRepository';

@Service()
export class StudentService {
  constructor(
    @InjectRepository() private studentRepository: StudentRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    @InjectRepository() private majorRepository: MajorRepository,
  ) {
    //
  }

  public async getAll(resourceOptions?: object) {
    const result = await this.studentRepository.getManyAndCount(resourceOptions);
    const majors = await this.majorRepository.getMany();
    const students = await Promise.all(result.rows.map(async (student) => {
      const majorName = majors.find(major => major.id === student.major_id)?.name;
      return {
        ...student,
        major_name: majorName,
      };
    }));
    return students;
  }

  public async findOneById(id: number, resourceOptions?: object) {
    const student = await this.getRequestedStudentOrFail(id, resourceOptions);
    const majors = await this.majorRepository.getMany();
    return {
      ...student,
      additionalData : {
        majors: majors,
      }
    };
  }

  public async create(data: object) {
    const student = await this.studentRepository.createStudent(data);

    this.eventDispatcher.dispatch('onStudentCreate', student);

    return student;
  }

  public async updateOneById(id: number, data: object) {
    const student = await this.getRequestedStudentOrFail(id);

    return await this.studentRepository.updateStudent(student, data);
  }

  public async deleteOneById(id: number) {
    return await this.studentRepository.delete(id);
  }

  private async getRequestedStudentOrFail(id: number, resourceOptions?: object) {
    const student = await this.studentRepository.getOneById(id);

    if (!student) {
      throw new StudentNotFoundException();
    }

    return student;
  }

  public async bulkCreate(data: object[]) {
    const students = await this.studentRepository.bulkCreateStudents(data);
    const majors = await this.majorRepository.getMany();
    const studentsWithMajorName = await Promise.all(students.map(async (student) => {
      const majorName = majors.find(major => major.id === student.major_id)?.name;
      return {
        ...student,
        major_name: majorName,
        class_of: student.entry_on_date ? student.entry_on_date.toString().split('-')[0] : '',
      };
    }));

    this.eventDispatcher.dispatch('onStudentCreate', students);

    return studentsWithMajorName;
  }
  
}
