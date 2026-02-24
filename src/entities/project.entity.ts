import { Profile } from '@entities/profile.entity';
import { AbstractEntitySkills, Skill } from '@entities/skill.entity';
import {
  Collection,
  Entity,
  Filter,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

export const PROJECT_TITLE_MIN_LENGTH = 3;
export const PROJECT_TITLE_MAX_LENGTH = 255;

export const PROJECT_DESCRIPTION_MIN_LENGTH = 8;

@Entity({ tableName: 'projects' })
@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
})
export class Project {
  @PrimaryKey({ name: 'uuid', type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  uuid!: string;

  @ManyToOne(() => Profile, {
    fieldName: 'profile_uuid',
    nullable: false,
    deleteRule: 'cascade',
  })
  profile!: Profile;

  @Property({
    name: 'title',
    type: 'varchar',
    length: PROJECT_TITLE_MAX_LENGTH,
    nullable: false,
  })
  title!: string;

  @Property({ name: 'description', type: 'text', nullable: false })
  description!: string;

  @ManyToMany({ entity: () => Skill, pivotEntity: () => ProjectSkills })
  skills = new Collection<Skill>(this);

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
    onUpdate: () => new Date(),
  })
  updatedAt!: Date;

  @Property({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;
}

@Entity({ tableName: 'project_skills' })
export class ProjectSkills extends AbstractEntitySkills {
  @ManyToOne(() => Project, {
    fieldName: 'project_uuid',
    nullable: false,
    deleteRule: 'cascade',
    primary: true,
  })
  project!: Project;
}
