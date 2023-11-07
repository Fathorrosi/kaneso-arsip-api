import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { Position } from '../Position/Position';
import { Department } from '../Department/Department';

@Entity({ name: 'staff' })
export class Staff {
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

  @OneToOne(() => Position)
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @OneToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
