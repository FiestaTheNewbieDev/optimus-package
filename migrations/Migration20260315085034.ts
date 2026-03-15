import { Migration } from '@mikro-orm/migrations';

export class Migration20260315085034 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create type "skill_category" as enum ('language', 'framework', 'library', 'database', 'tool', 'cloud', 'devops', 'testing', 'architecture', 'methodology', 'softskill', 'other');`,
    );
    this.addSql(`create type "user_role" as enum ('user', 'admin', 'owner');`);
    this.addSql(
      `create table "profiles" ("uuid" uuid not null default gen_random_uuid(), "first_name" varchar(64) not null, "last_name" varchar(64) not null, "title" varchar(128) null, "biography" text null, "birth_date" timestamptz null, "location" varchar(128) null, "contact_email" varchar(320) null, "contact_phone_number" varchar(32) null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), constraint "profiles_pkey" primary key ("uuid"));`,
    );

    this.addSql(
      `create table "linkedin_profiles" ("uuid" uuid not null default gen_random_uuid(), "slug" varchar(64) null, "updated_at" timestamptz not null default now(), "profile_uuid" uuid not null, constraint "linkedin_profiles_pkey" primary key ("uuid"));`,
    );
    this.addSql(
      `alter table "linkedin_profiles" add constraint "linkedin_profiles_profile_uuid_unique" unique ("profile_uuid");`,
    );

    this.addSql(
      `create table "github_profiles" ("uuid" uuid not null default gen_random_uuid(), "username" varchar(64) null, "updated_at" timestamptz not null default now(), "profile_uuid" uuid not null, constraint "github_profiles_pkey" primary key ("uuid"));`,
    );
    this.addSql(
      `alter table "github_profiles" add constraint "github_profiles_profile_uuid_unique" unique ("profile_uuid");`,
    );

    this.addSql(
      `create table "experiences" ("uuid" uuid not null default gen_random_uuid(), "profile_uuid" uuid not null, "title" varchar(255) not null, "description" text not null, "start_date" timestamptz not null, "end_date" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "experiences_pkey" primary key ("uuid"));`,
    );

    this.addSql(
      `create table "education" ("uuid" uuid not null default gen_random_uuid(), "profile_uuid" uuid not null, "title" varchar(255) not null, "description" text not null, "start_date" timestamptz not null, "end_date" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "education_pkey" primary key ("uuid"));`,
    );

    this.addSql(
      `create table "contact_messages" ("uuid" uuid not null default gen_random_uuid(), "profile_uuid" uuid not null, "first_name" varchar(64) not null, "last_name" varchar(64) not null, "organization_name" varchar(128) null, "email" varchar(320) not null, "phone_number" varchar(32) null, "message" text not null, "lang" varchar(5) null, "created_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "contact_messages_pkey" primary key ("uuid"));`,
    );
    this.addSql(
      `create index "created_at_idx" on "contact_messages" ("created_at");`,
    );
    this.addSql(
      `create index "phone_number_idx" on "contact_messages" ("phone_number");`,
    );
    this.addSql(`create index "email_idx" on "contact_messages" ("email");`);

    this.addSql(
      `create table "projects" ("uuid" uuid not null default gen_random_uuid(), "profile_uuid" uuid not null, "title" varchar(255) not null, "description" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "projects_pkey" primary key ("uuid"));`,
    );

    this.addSql(
      `create table "skills" ("slug" varchar(64) not null, "label" varchar(64) not null, "icon_url" text null, "category" "skill_category" not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "skills_pkey" primary key ("slug"));`,
    );

    this.addSql(
      `create table "project_skills" ("project_uuid" uuid not null, "skill_slug" varchar(64) not null, "created_at" timestamptz not null default now(), constraint "project_skills_pkey" primary key ("project_uuid", "skill_slug"));`,
    );

    this.addSql(
      `create table "profile_skills" ("profile_uuid" uuid not null, "skill_slug" varchar(64) not null, "created_at" timestamptz not null default now(), constraint "profile_skills_pkey" primary key ("profile_uuid", "skill_slug"));`,
    );

    this.addSql(
      `create table "experience_skills" ("experience_uuid" uuid not null, "skill_slug" varchar(64) not null, "created_at" timestamptz not null default now(), constraint "experience_skills_pkey" primary key ("experience_uuid", "skill_slug"));`,
    );

    this.addSql(
      `create table "education_skills" ("education_uuid" uuid not null, "skill_slug" varchar(64) not null, "created_at" timestamptz not null default now(), constraint "education_skills_pkey" primary key ("education_uuid", "skill_slug"));`,
    );

    this.addSql(
      `create table "users" ("uuid" uuid not null default gen_random_uuid(), "username" varchar(32) not null, "email" varchar(320) not null, "password" text not null, "role" "user_role" not null default 'user', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "users_pkey" primary key ("uuid"));`,
    );
    this.addSql(
      `alter table "users" add constraint "users_username_unique" unique ("username");`,
    );
    this.addSql(
      `alter table "users" add constraint "users_email_unique" unique ("email");`,
    );

    this.addSql(
      `alter table "linkedin_profiles" add constraint "linkedin_profiles_profile_uuid_foreign" foreign key ("profile_uuid") references "profiles" ("uuid") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "github_profiles" add constraint "github_profiles_profile_uuid_foreign" foreign key ("profile_uuid") references "profiles" ("uuid") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "experiences" add constraint "experiences_profile_uuid_foreign" foreign key ("profile_uuid") references "profiles" ("uuid") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "education" add constraint "education_profile_uuid_foreign" foreign key ("profile_uuid") references "profiles" ("uuid") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "contact_messages" add constraint "contact_messages_profile_uuid_foreign" foreign key ("profile_uuid") references "profiles" ("uuid") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "projects" add constraint "projects_profile_uuid_foreign" foreign key ("profile_uuid") references "profiles" ("uuid") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "project_skills" add constraint "project_skills_project_uuid_foreign" foreign key ("project_uuid") references "projects" ("uuid") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "project_skills" add constraint "project_skills_skill_slug_foreign" foreign key ("skill_slug") references "skills" ("slug") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "profile_skills" add constraint "profile_skills_profile_uuid_foreign" foreign key ("profile_uuid") references "profiles" ("uuid") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "profile_skills" add constraint "profile_skills_skill_slug_foreign" foreign key ("skill_slug") references "skills" ("slug") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "experience_skills" add constraint "experience_skills_experience_uuid_foreign" foreign key ("experience_uuid") references "experiences" ("uuid") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "experience_skills" add constraint "experience_skills_skill_slug_foreign" foreign key ("skill_slug") references "skills" ("slug") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "education_skills" add constraint "education_skills_education_uuid_foreign" foreign key ("education_uuid") references "education" ("uuid") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "education_skills" add constraint "education_skills_skill_slug_foreign" foreign key ("skill_slug") references "skills" ("slug") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "linkedin_profiles" drop constraint "linkedin_profiles_profile_uuid_foreign";`,
    );

    this.addSql(
      `alter table "github_profiles" drop constraint "github_profiles_profile_uuid_foreign";`,
    );

    this.addSql(
      `alter table "experiences" drop constraint "experiences_profile_uuid_foreign";`,
    );

    this.addSql(
      `alter table "education" drop constraint "education_profile_uuid_foreign";`,
    );

    this.addSql(
      `alter table "contact_messages" drop constraint "contact_messages_profile_uuid_foreign";`,
    );

    this.addSql(
      `alter table "projects" drop constraint "projects_profile_uuid_foreign";`,
    );

    this.addSql(
      `alter table "profile_skills" drop constraint "profile_skills_profile_uuid_foreign";`,
    );

    this.addSql(
      `alter table "experience_skills" drop constraint "experience_skills_experience_uuid_foreign";`,
    );

    this.addSql(
      `alter table "education_skills" drop constraint "education_skills_education_uuid_foreign";`,
    );

    this.addSql(
      `alter table "project_skills" drop constraint "project_skills_project_uuid_foreign";`,
    );

    this.addSql(
      `alter table "project_skills" drop constraint "project_skills_skill_slug_foreign";`,
    );

    this.addSql(
      `alter table "profile_skills" drop constraint "profile_skills_skill_slug_foreign";`,
    );

    this.addSql(
      `alter table "experience_skills" drop constraint "experience_skills_skill_slug_foreign";`,
    );

    this.addSql(
      `alter table "education_skills" drop constraint "education_skills_skill_slug_foreign";`,
    );

    this.addSql(`drop table if exists "profiles" cascade;`);

    this.addSql(`drop table if exists "linkedin_profiles" cascade;`);

    this.addSql(`drop table if exists "github_profiles" cascade;`);

    this.addSql(`drop table if exists "experiences" cascade;`);

    this.addSql(`drop table if exists "education" cascade;`);

    this.addSql(`drop table if exists "contact_messages" cascade;`);

    this.addSql(`drop table if exists "projects" cascade;`);

    this.addSql(`drop table if exists "skills" cascade;`);

    this.addSql(`drop table if exists "project_skills" cascade;`);

    this.addSql(`drop table if exists "profile_skills" cascade;`);

    this.addSql(`drop table if exists "experience_skills" cascade;`);

    this.addSql(`drop table if exists "education_skills" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop type "skill_category";`);
    this.addSql(`drop type "user_role";`);
  }
}
