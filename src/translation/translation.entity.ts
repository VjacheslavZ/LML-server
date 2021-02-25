import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Vocabulary } from '../vocabulary/vocabulary.entity';
/*
  Collection of translations google translation API
*/
@Entity()
export class TranslationEN extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  translation: string;

  @OneToMany(() => Vocabulary, (vocabulary) => vocabulary.translation_en)
  vocabulary: Vocabulary[];
}
