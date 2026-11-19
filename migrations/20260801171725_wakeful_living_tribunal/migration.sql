COMMIT;--> statement-breakpoint
CREATE INDEX CONCURRENTLY "ix_examples_name_trgm" ON "examples" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX CONCURRENTLY "ix_examples_created_at" ON "examples" ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX CONCURRENTLY "ix_examples_updated_at" ON "examples" ("updated_at" DESC NULLS LAST);--> statement-breakpoint
BEGIN;