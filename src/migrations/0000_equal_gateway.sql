CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'owner');--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_uuid" uuid NOT NULL,
	"first_name" varchar(64) NOT NULL,
	"last_name" varchar(64) NOT NULL,
	"organization_name" varchar(128),
	"email" varchar(320) NOT NULL,
	"phone_number" varchar(32),
	"message" text NOT NULL,
	"lang" varchar(5),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "education" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_uuid" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "education_skills" (
	"education_uuid" uuid NOT NULL,
	"skill_slug" varchar(64) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "education_skills_education_uuid_skill_slug_pk" PRIMARY KEY("education_uuid","skill_slug")
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_uuid" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "experience_skills" (
	"experience_uuid" uuid NOT NULL,
	"skill_slug" varchar(64) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "experience_skills_experience_uuid_skill_slug_pk" PRIMARY KEY("experience_uuid","skill_slug")
);
--> statement-breakpoint
CREATE TABLE "github_profiles" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_uuid" uuid NOT NULL,
	"username" varchar(64),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "github_profiles_profile_uuid_unique" UNIQUE("profile_uuid")
);
--> statement-breakpoint
CREATE TABLE "linkedin_profiles" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_uuid" uuid NOT NULL,
	"slug" varchar(64),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "linkedin_profiles_profile_uuid_unique" UNIQUE("profile_uuid")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(64) NOT NULL,
	"last_name" varchar(64) NOT NULL,
	"title" varchar(128),
	"biography" text,
	"birth_date" timestamp with time zone,
	"location" varchar(128),
	"contact_email" varchar(320),
	"contact_phone_number" varchar(32),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile_skills" (
	"profile_uuid" uuid NOT NULL,
	"skill_slug" varchar(64) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profile_skills_profile_uuid_skill_slug_pk" PRIMARY KEY("profile_uuid","skill_slug")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_uuid" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "project_skills" (
	"project_uuid" uuid NOT NULL,
	"skill_slug" varchar(64) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "project_skills_project_uuid_skill_slug_pk" PRIMARY KEY("project_uuid","skill_slug")
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"slug" varchar(64) PRIMARY KEY NOT NULL,
	"label" varchar(64) NOT NULL,
	"icon_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(32) NOT NULL,
	"email" varchar(320) NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "contact_messages" ADD CONSTRAINT "contact_messages_profile_uuid_profiles_uuid_fk" FOREIGN KEY ("profile_uuid") REFERENCES "public"."profiles"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_profile_uuid_profiles_uuid_fk" FOREIGN KEY ("profile_uuid") REFERENCES "public"."profiles"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education_skills" ADD CONSTRAINT "education_skills_education_uuid_education_uuid_fk" FOREIGN KEY ("education_uuid") REFERENCES "public"."education"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education_skills" ADD CONSTRAINT "education_skills_skill_slug_skills_slug_fk" FOREIGN KEY ("skill_slug") REFERENCES "public"."skills"("slug") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_profile_uuid_profiles_uuid_fk" FOREIGN KEY ("profile_uuid") REFERENCES "public"."profiles"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_skills" ADD CONSTRAINT "experience_skills_experience_uuid_experiences_uuid_fk" FOREIGN KEY ("experience_uuid") REFERENCES "public"."experiences"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_skills" ADD CONSTRAINT "experience_skills_skill_slug_skills_slug_fk" FOREIGN KEY ("skill_slug") REFERENCES "public"."skills"("slug") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "github_profiles" ADD CONSTRAINT "github_profiles_profile_uuid_profiles_uuid_fk" FOREIGN KEY ("profile_uuid") REFERENCES "public"."profiles"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linkedin_profiles" ADD CONSTRAINT "linkedin_profiles_profile_uuid_profiles_uuid_fk" FOREIGN KEY ("profile_uuid") REFERENCES "public"."profiles"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_skills" ADD CONSTRAINT "profile_skills_profile_uuid_profiles_uuid_fk" FOREIGN KEY ("profile_uuid") REFERENCES "public"."profiles"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_skills" ADD CONSTRAINT "profile_skills_skill_slug_skills_slug_fk" FOREIGN KEY ("skill_slug") REFERENCES "public"."skills"("slug") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_profile_uuid_profiles_uuid_fk" FOREIGN KEY ("profile_uuid") REFERENCES "public"."profiles"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_project_uuid_projects_uuid_fk" FOREIGN KEY ("project_uuid") REFERENCES "public"."projects"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_skill_slug_skills_slug_fk" FOREIGN KEY ("skill_slug") REFERENCES "public"."skills"("slug") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "email_idx" ON "contact_messages" USING btree ("email");--> statement-breakpoint
CREATE INDEX "phone_number_idx" ON "contact_messages" USING btree ("phone_number");--> statement-breakpoint
CREATE INDEX "created_at_idx" ON "contact_messages" USING btree ("created_at");