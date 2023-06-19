import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { hashSync as hash, genSaltSync as salt } from 'bcrypt';
import { UserRole } from 'src/enums/role.enum';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  username: string;
  @Column({ transformer: { to: (value) => hash(value, salt()), from: (value) => value } })
  password: string;
  @Column({
    type: 'nvarchar',
    transformer: { to: (value) => JSON.stringify(value), from: (value) => JSON.parse(value) },
  })
  roles: Array<UserRole>;

  access_token: string;

  public get role(): UserRole {
    return this.roles[0];
  }

  public get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}
