import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  ManyToOne,
} from 'typeorm';

import { TranslationEN } from '../translation/translation.entity';
import { User } from '../auth/user.entity';
import { VocabularyStatus } from './vocabulary-status.enum';
/*
 * Added word to learning
 */
@Entity()
export class Vocabulary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.vocabulary)
  user: User;

  @ManyToOne(() => TranslationEN, (translationEN) => translationEN.vocabulary)
  translation_en: TranslationEN;

  @Column()
  status: VocabularyStatus;
}
