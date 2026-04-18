ALTER TABLE "facilities" ADD COLUMN "street_number_and_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" DROP COLUMN "street_number";--> statement-breakpoint
ALTER TABLE "facilities" DROP COLUMN "street_name";