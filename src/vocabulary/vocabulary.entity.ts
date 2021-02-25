import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  ManyToOne,
} from 'typeorm';

import { TranslationEN } from '../translation/translation.entity';

/*
  Added word to learning
*/
@Entity()
export class Vocabulary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => TranslationEN, (translationEN) => translationEN.vocabulary)
  translation_en: TranslationEN;

  @Column()
  isDone: boolean;
}
