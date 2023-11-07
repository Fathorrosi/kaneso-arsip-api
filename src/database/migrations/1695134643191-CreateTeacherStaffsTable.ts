import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTeacherStaffsTable1695134643191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teacher-staff',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'nik',
            type: 'varchar',
          },
          {
            name: 'employment_status',
            type: 'varchar',
          },
          {
            name: 'position_id',
            type: 'bigint',
          },
          {
            name: 'subject_id',
            type: 'bigint',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'department_id',
            type: 'bigint',
          },
          {
            name: 'enrollment_year',
            type: 'date',
          },
          {
            name: 'photo',
            type: 'longblob',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'teacher-staff',
      new TableForeignKey({
        columnNames: ['position_id'],
        referencedTableName: 'positions',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'teacher-staff',
      new TableForeignKey({
        columnNames: ['subject_id'],
        referencedTableName: 'subjects',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'teacher-staff',
      new TableForeignKey({
        columnNames: ['department_id'],
        referencedTableName: 'departments',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teacher-staff');
  }
}
