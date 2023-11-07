import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'subjects' })
export class Subject extends EntityBase  {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}