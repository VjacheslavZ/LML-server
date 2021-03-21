import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Vocabulary } from '../vocabulary/vocabulary.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 'Student',
  })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    default: null,
    unique: true,
  })
  email: string;

  @Column({
    default: null,
  })
  photo: string;

  @OneToMany(() => Vocabulary, (vocabulary) => vocabulary.user)
  vocabulary: Vocabulary[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
