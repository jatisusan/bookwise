ALTER TYPE "public"."borrow_status" ADD VALUE 'REQUESTED' BEFORE 'BORROWED';--> statement-breakpoint
ALTER TYPE "public"."borrow_status" ADD VALUE 'OVERDUE';