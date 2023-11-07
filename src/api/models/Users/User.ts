import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Exclude, Expose } from 'class-transformer';
import { Role } from './Role';
import { HashService } from '@base/infrastructure/services/hash/HashService';
import { UserStatus } from '@base/api/enums/User/UserEnum';

@Entity({ name: 'users' })
export class User extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role_id: number;

  @Column({ default: UserStatus.ACTIVE})
  status: UserStatus;

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Expose({ name: 'full_name' })
  get fullName() {
    return this.first_name + ' ' + this.last_name;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password) this.password = await new HashService().make(this.password);
  }

  @BeforeInsert()
  async setDefaultRole() {
    const roleId = this.role_id ? this.role_id : 1;

    this.role_id = roleId;
  }
}
