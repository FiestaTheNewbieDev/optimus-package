import { ProfileEntity } from '@entities/profile.entity';
import { AbstractEntitySkills, SkillEntity } from '@entities/skill.entity';
import {
  Collection,
  Entity,
  Filter,
  ManyToMany,
  ManyToOne,
  Opt,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

export const EXPERIENCE_TITLE_MIN_LENGTH = 3;
export const EXPERIENCE_TITLE_MAX_LENGTH = 255;

export const EXPERIENCE_DESCRIPTION_MIN_LENGTH = 8;

@Entity({ tableName: 'experiences' })
@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
})
export class ExperienceEntity {
  @PrimaryKey({ name: 'uuid', type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  readonly uuid: Opt<string> = crypto.randomUUID();

  @ManyToOne(() => ProfileEntity, {
    fieldName: 'profile_uuid',
    nullable: false,
    deleteRule: 'cascade',
  })
  profile!: ProfileEntity;

  @Property({
    name: 'title',
    type: 'varchar',
    length: EXPERIENCE_TITLE_MAX_LENGTH,
    nullable: false,
  })
  title!: string;

  @Property({ name: 'description', type: 'text', nullable: false })
  description!: string;

  @Property({
    name: 'start_date',
    type: 'timestamp with time zone',
    nullable: false,
  })
  startDate!: Date;

  @Property({
    name: 'end_date',
    type: 'timestamp with time zone',
    nullable: true,
  })
  endDate?: Date;

  @ManyToMany({
    entity: () => SkillEntity,
    pivotEntity: () => ExperienceSkillsEntity,
  })
  skills = new Collection<SkillEntity>(this);

  @Property({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
    defaultRaw: 'now()',
  })
  readonly createdAt: Opt<Date> = new Date();

  @Property({
    name: 'updated_at',
    type: 'timestamp with time zone',
    nullable: false,
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
  })
  updatedAt: Opt<Date> = new Date();

  @Property({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;
}

@Entity({ tableName: 'experience_skills' })
export class ExperienceSkillsEntity extends AbstractEntitySkills {
  @ManyToOne(() => ExperienceEntity, {
    fieldName: 'experience_uuid',
    nullable: false,
    deleteRule: 'cascade',
    primary: true,
  })
  experience!: ExperienceEntity;
}
