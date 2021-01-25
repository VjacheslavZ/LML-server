import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Vocabulary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.vocabulary)
  user: User;

  @Column()
  user_id: number;

  @Column('simple-array')
  translation_id: number[];
}
