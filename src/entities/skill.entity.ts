import { SkillCategory } from '@/types';
import {
  Entity,
  Enum,
  Filter,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

export const SLUG_MIN_LENGTH = 4;
export const SLUG_MAX_LENGTH = 64;

export const LABEL_MIN_LENGTH = 4;
export const LABEL_MAX_LENGTH = 64;

@Entity({ tableName: 'skills' })
@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
})
export class Skill {
  @PrimaryKey({ name: 'slug', type: 'varchar', length: SLUG_MAX_LENGTH })
  slug!: string;

  @Property({
    name: 'label',
    type: 'varchar',
    length: LABEL_MAX_LENGTH,
    nullable: false,
  })
  label!: string;

  @Property({ name: 'icon_url', type: 'text', nullable: true })
  iconUrl?: string;

  @Enum({
    name: 'category',
    items: () => SkillCategory,
    nullable: false,
    nativeEnumName: 'skill_category',
  })
  category!: SkillCategory;

  @Property({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
    defaultRaw: 'now()',
  })
  createdAt!: Date;

  @Property({
    name: 'updated_at',
    type: 'timestamp with time zone',
    nullable: false,
    defaultRaw: 'now()',
  })
  updatedAt!: Date;

  @Property({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;
}

export abstract class AbstractEntitySkills {
  @ManyToOne(() => Skill, {
    fieldName: 'skill_slug',
    nullable: false,
    deleteRule: 'cascade',
    primary: true,
  })
  skill!: Skill;

  @Property({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
    defaultRaw: 'now()',
  })
  createdAt!: Date;
}
