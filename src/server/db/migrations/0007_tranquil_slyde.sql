ALTER TABLE "facilities" ADD COLUMN "street_number" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ADD COLUMN "street_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ADD COLUMN "city" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ADD COLUMN "state" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ADD COLUMN "zip_code" varchar(256) NOT NULL;