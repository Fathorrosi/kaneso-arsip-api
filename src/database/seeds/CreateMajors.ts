import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Major } from '@api/models/Major/Major';

export default class CreateMajors implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const majorsData = [
      { name: 'Multimedia', status: 'Active' },
      { name: 'Teknik Mesin', status: 'Active' },
      // Tambahkan data jurusan lain sesuai kebutuhan Anda
    ];

    for (const data of majorsData) {
      const major = await connection.getRepository(Major).findOne({ where: { name: data.name } });

      if (major) {
        continue;
      }

      const newMajor = new Major();
      newMajor.name = data.name;
      newMajor.status = data.status;

      await connection.getRepository(Major).save(newMajor);
    }
  }
}
