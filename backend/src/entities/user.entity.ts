import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync as hash, genSaltSync as salt } from 'bcrypt';
import { Role } from 'src/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ transformer: { to: (value) => hash(value, salt()), from: (value) => value } })
  password: string;
  @Column({
    type: 'nvarchar',
    transformer: { to: (value) => JSON.stringify(value), from: (value) => JSON.parse(value) },
  })
  roles: Array<Role>;

  access_token: string;

  public get role(): Role {
    return this.roles[0];
  }
}
