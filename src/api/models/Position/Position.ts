import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'positions' })
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}