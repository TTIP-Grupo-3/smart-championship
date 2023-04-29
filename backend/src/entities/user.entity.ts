import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync as hash, genSaltSync as salt } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ transformer: { to: (value) => hash(value, salt()), from: (value) => value } })
  password: string;
}
