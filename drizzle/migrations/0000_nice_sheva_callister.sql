CREATE TABLE `articles` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`summary` text NOT NULL,
	`content` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`theme_id` varchar(100) NOT NULL,
	`read_time` varchar(50) NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `category_idx` ON `articles` (`category`);--> statement-breakpoint
CREATE INDEX `theme_idx` ON `articles` (`theme_id`);--> statement-breakpoint
CREATE INDEX `date_idx` ON `articles` (`date`);