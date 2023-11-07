import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { Position } from '../Position/Position';
import { Department } from '../Department/Department';
import { Subject } from '../Subject/Subject';

@Entity({ name: 'teacher-staff' })
export class TeacherStaff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nik: string;

  @Column()
  employment_status: string;

  @Column()
  status: string;

  @Column({ type: 'date' })
  enrollment_year: Date;

  @Column()
  photo: Buffer | null;

  @Column()
  position_id: number;

  @Column()
  department_id: number;

  @Column()
  subject_id: number | null;

  @OneToOne(() => Position)
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @OneToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToOne(() => Subject)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;
}
