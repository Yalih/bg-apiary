-- BG Apiary Sprint 3.4 initial PostgreSQL migration

CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'BEEKEEPER', 'OBSERVER');
CREATE TYPE "HiveStatus" AS ENUM ('ACTIVE', 'WEAK', 'WATCH', 'INACTIVE', 'LOST');
CREATE TYPE "QueenStatus" AS ENUM ('ACTIVE', 'MISSING', 'REPLACED', 'VIRGIN', 'UNKNOWN');
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED');
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE "InspectionMood" AS ENUM ('CALM', 'NORMAL', 'NERVOUS', 'AGGRESSIVE');

CREATE TABLE "users" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL,
  "password_hash" TEXT NOT NULL,
  "display_name" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'BEEKEEPER',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "apiaries" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "owner_id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "latitude" DOUBLE PRECISION,
  "longitude" DOUBLE PRECISION,
  "address" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "apiaries_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "hives" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "apiary_id" UUID NOT NULL,
  "hive_number" TEXT NOT NULL,
  "hive_type" TEXT NOT NULL,
  "status" "HiveStatus" NOT NULL DEFAULT 'ACTIVE',
  "frame_count" INTEGER,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "hives_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "queens" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "hive_id" UUID NOT NULL,
  "name" TEXT,
  "breed" TEXT,
  "birth_year" INTEGER,
  "mark_color" TEXT,
  "status" "QueenStatus" NOT NULL DEFAULT 'UNKNOWN',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "queens_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "inspections" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "hive_id" UUID NOT NULL,
  "inspected_at" TIMESTAMPTZ NOT NULL,
  "mood" "InspectionMood",
  "summary" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "inspections_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "inspection_items" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "inspection_id" UUID NOT NULL,
  "type" TEXT NOT NULL,
  "value" TEXT,
  "note" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "inspection_items_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "notes" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "hive_id" UUID,
  "author_id" UUID,
  "title" TEXT,
  "content" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "tasks" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "hive_id" UUID,
  "assignee_id" UUID,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "due_date" TIMESTAMPTZ,
  "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
  "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "feedings" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "hive_id" UUID NOT NULL,
  "fed_at" TIMESTAMPTZ NOT NULL,
  "feed_type" TEXT NOT NULL,
  "amount" DOUBLE PRECISION,
  "unit" TEXT,
  "note" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "feedings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "treatments" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "hive_id" UUID NOT NULL,
  "treated_at" TIMESTAMPTZ NOT NULL,
  "product" TEXT NOT NULL,
  "dose" TEXT,
  "reason" TEXT,
  "note" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "treatments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "photos" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "hive_id" UUID,
  "url" TEXT NOT NULL,
  "caption" TEXT,
  "mime_type" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "weather_logs" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "apiary_id" UUID NOT NULL,
  "logged_at" TIMESTAMPTZ NOT NULL,
  "temperature_c" DOUBLE PRECISION,
  "humidity" DOUBLE PRECISION,
  "wind_ms" DOUBLE PRECISION,
  "condition" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "weather_logs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "audit_logs" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID,
  "action" TEXT NOT NULL,
  "entity" TEXT NOT NULL,
  "entity_id" TEXT,
  "payload" JSONB,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "apiaries_owner_id_idx" ON "apiaries"("owner_id");
CREATE INDEX "hives_apiary_id_idx" ON "hives"("apiary_id");
CREATE UNIQUE INDEX "hives_apiary_id_hive_number_key" ON "hives"("apiary_id", "hive_number");
CREATE INDEX "queens_hive_id_idx" ON "queens"("hive_id");
CREATE INDEX "inspections_hive_id_inspected_at_idx" ON "inspections"("hive_id", "inspected_at");
CREATE INDEX "inspection_items_inspection_id_idx" ON "inspection_items"("inspection_id");
CREATE INDEX "notes_hive_id_idx" ON "notes"("hive_id");
CREATE INDEX "notes_author_id_idx" ON "notes"("author_id");
CREATE INDEX "tasks_hive_id_idx" ON "tasks"("hive_id");
CREATE INDEX "tasks_assignee_id_idx" ON "tasks"("assignee_id");
CREATE INDEX "tasks_status_due_date_idx" ON "tasks"("status", "due_date");
CREATE INDEX "feedings_hive_id_fed_at_idx" ON "feedings"("hive_id", "fed_at");
CREATE INDEX "treatments_hive_id_treated_at_idx" ON "treatments"("hive_id", "treated_at");
CREATE INDEX "photos_hive_id_idx" ON "photos"("hive_id");
CREATE INDEX "weather_logs_apiary_id_logged_at_idx" ON "weather_logs"("apiary_id", "logged_at");
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");
CREATE INDEX "audit_logs_entity_entity_id_idx" ON "audit_logs"("entity", "entity_id");

ALTER TABLE "apiaries" ADD CONSTRAINT "apiaries_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "hives" ADD CONSTRAINT "hives_apiary_id_fkey" FOREIGN KEY ("apiary_id") REFERENCES "apiaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "queens" ADD CONSTRAINT "queens_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "inspection_items" ADD CONSTRAINT "inspection_items_inspection_id_fkey" FOREIGN KEY ("inspection_id") REFERENCES "inspections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "notes" ADD CONSTRAINT "notes_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hives"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "notes" ADD CONSTRAINT "notes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hives"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "feedings" ADD CONSTRAINT "feedings_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "photos" ADD CONSTRAINT "photos_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hives"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "weather_logs" ADD CONSTRAINT "weather_logs_apiary_id_fkey" FOREIGN KEY ("apiary_id") REFERENCES "apiaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
