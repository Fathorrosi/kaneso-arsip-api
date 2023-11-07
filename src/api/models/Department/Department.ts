
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'departments' })
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}