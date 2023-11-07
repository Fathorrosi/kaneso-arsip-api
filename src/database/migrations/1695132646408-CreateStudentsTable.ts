import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateStudentsTable1695132646408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nis',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'photo',
            type: 'varchar', // Ubah tipe data menjadi 'varchar' atau 'text' sesuai dengan kebutuhan Anda
            isNullable: true,
          },
          {
            name: 'entry_on_date',
            type: 'date', // Sesuaikan nama kolom dengan class 'Student'
          },
          {
            name: 'graduate_on_date',
            type: 'date', // Sesuaikan nama kolom dengan class 'Student'
            isNullable: true,
          },
          {
            name: 'created_date',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_date',
            type: 'timestamp',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'graduated',
            type: 'boolean',
          },
          {
            name: 'note',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'major_id',
            type: 'bigint', // Kolom ini akan digunakan untuk kunci asing ke entitas Major
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        columnNames: ['major_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'majors', // Sesuaikan dengan nama tabel Major Anda
        onDelete: 'CASCADE', // Atur sesuai kebutuhan Anda
        onUpdate: 'CASCADE', // Atur sesuai kebutuhan Anda
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('students', 'FK_students_major_id');
    await queryRunner.dropTable('students');
  }
}
