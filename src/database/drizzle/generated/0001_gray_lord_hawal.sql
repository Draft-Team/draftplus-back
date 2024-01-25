ALTER TABLE `users` RENAME TO `accounts`;--> statement-breakpoint
ALTER TABLE `accounts` RENAME COLUMN `user_name` TO `username`;--> statement-breakpoint
ALTER TABLE `accounts` RENAME COLUMN `profile_pic` TO `avatar_url`;