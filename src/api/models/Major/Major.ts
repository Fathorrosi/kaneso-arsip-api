import { EntityBase } from "@base/infrastructure/abstracts/EntityBase";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'majors' })
export class Major extends EntityBase  {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @Column()
    status: string;
}
