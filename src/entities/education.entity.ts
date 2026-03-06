import { Profile } from '@entities/profile.entity';
import { AbstractEntitySkills, Skill } from '@entities/skill.entity';
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

export const EDUCATION_TITLE_MIN_LENGTH = 3;
export const EDUCATION_TITLE_MAX_LENGTH = 255;

export const EDUCATION_DESCRIPTION_MIN_LENGTH = 8;

@Entity({ tableName: 'education' })
@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
})
export class Education {
  @PrimaryKey({ name: 'uuid', type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  readonly uuid: Opt<string> = crypto.randomUUID();

  @ManyToOne(() => Profile, {
    fieldName: 'profile_uuid',
    nullable: false,
    deleteRule: 'cascade',
  })
  profile!: Profile;

  @Property({
    name: 'title',
    type: 'varchar',
    length: EDUCATION_TITLE_MAX_LENGTH,
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

  @ManyToMany({ entity: () => Skill, pivotEntity: () => EducationSkills })
  skills = new Collection<Skill>(this);

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

@Entity({ tableName: 'education_skills' })
export class EducationSkills extends AbstractEntitySkills {
  @ManyToOne(() => Education, {
    fieldName: 'education_uuid',
    nullable: false,
    deleteRule: 'cascade',
    primary: true,
  })
  education!: Education;
}
