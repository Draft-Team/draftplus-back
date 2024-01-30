CREATE TABLE `recipes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`image` text NOT NULL,
	`ingredients` text NOT NULL,
	`steps` text NOT NULL,
	`description` text NOT NULL,
	`rating` integer,
	`author_id` text,
	FOREIGN KEY (`author_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action
);
