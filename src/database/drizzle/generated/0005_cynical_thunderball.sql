CREATE TABLE `recipe_rating` (
	`id` text PRIMARY KEY NOT NULL,
	`rate` integer NOT NULL,
	`recipe_id` text NOT NULL,
	`account_id` text NOT NULL,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/