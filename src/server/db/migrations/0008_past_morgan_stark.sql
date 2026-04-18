CREATE TYPE "public"."type" AS ENUM('pm', 'corrective', 'other');--> statement-breakpoint
ALTER TABLE "work_orders" ADD COLUMN "type" "type" DEFAULT 'corrective' NOT NULL;