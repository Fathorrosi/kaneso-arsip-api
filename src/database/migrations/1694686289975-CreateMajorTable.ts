import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateMajorTable1694686289975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
          name: 'majors',
          columns: [
            {
              name: 'id',
              type: 'bigint',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            { name: 'name', type: 'varchar', length: '50', isUnique: true },
            { name: 'created_date', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
            { name: 'updated_date', type: 'timestamp' },
            { name: 'status', type: 'varchar', length: '191', default: "'Active'" },
          ],
        });

        await queryRunner.createTable(table);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Majors');
    }

}
