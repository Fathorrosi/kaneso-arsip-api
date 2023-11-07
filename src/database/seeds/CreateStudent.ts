import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import { Student } from '@base/api/models/Student/Student';
import faker from 'faker';

export default class CreateStudent implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const studentData = [];
    
        for (let i = 0; i < 150; i++) {
          const student = new Student();
          student.nis = Math.floor(Math.random() * 99999999999999).toString().padStart(14, '0'); // NIS dengan 14 digit
          student.name = faker.name.findName();
          student.address = faker.address.streetAddress();
          student.entry_on_date = faker.date.past(10, '2012-01-01');
          student.graduate_on_date = faker.date.between(student.entry_on_date, '2022-12-31');
          student.created_date = faker.date.recent();
          student.updated_date = student.created_date;
          student.status = faker.random.arrayElement(['Active', 'Inactive']);
          student.graduated = faker.random.boolean();
          student.note = faker.lorem.sentence();
          student.major_id = faker.random.number({ min: 1, max: 2 });
    
          studentData.push(student);
        }
    
        await connection.manager.save(studentData);
    
        console.log('Seeder untuk Student berhasil dijalankan.');
      }
}
