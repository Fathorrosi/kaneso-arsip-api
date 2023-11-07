import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePositionsTable1618771206804 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'positions',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        { name: 'name', type: 'varchar', length: '50', isUnique: true },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('positions');
  }
}
