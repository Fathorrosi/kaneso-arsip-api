import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Major } from '../Major/Major';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';

@Entity({ name: 'students' })
export class Student extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nis: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  photo: string;

  @Column({ type: 'date' })
  entry_on_date: Date;  

  @Column({ type: 'date' })
  graduate_on_date: Date;  

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @Column()
  status: string;

  @Column({ type: 'boolean' })
  graduated: boolean;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column()
  major_id: number;

  @OneToOne(() => Major)
  @JoinColumn({ name: 'major_id' })
  major: Major;

  // @BeforeInsert()
  // async setDefaultRole() {
  //   const majorId = this.major_id ? this.major_id : 1;

  //   this.major_id = majorId;
  // }
}
