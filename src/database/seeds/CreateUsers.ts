import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import { User } from '@api/models/Users/User';
import { UserStatus } from '@base/api/enums/User/UserEnum';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)()
      .map(async (user: User) => {
        user.password = 'password';
        user.status = UserStatus.ACTIVE;
        return user;
      })
      .createMany(3);
  }
}
