-- YES!2026 Database Schema
-- MySQL

CREATE TABLE `assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_id` int NOT NULL,
  `media_type` enum('image','video') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'image',
  `storage_key` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `public_url` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `caption` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_media_uuid_unique` (`uuid`),
  KEY `project_media_project_id_index` (`project_id`),
  KEY `project_media_project_order_index` (`project_id`,`display_order`),
  CONSTRAINT `project_media_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
    `id`             INT      NOT NULL AUTO_INCREMENT,
    `uuid`           CHAR(36)          NOT NULL,
    `gbc_id`         VARCHAR(50)       NOT NULL,
    `password`       VARCHAR(255)      NOT NULL,
    `fname`          VARCHAR(100)      NOT NULL,
    `mname`          VARCHAR(100)      NULL,
    `lname`          VARCHAR(100)      NOT NULL,
    `pronoun`        VARCHAR(100)      NOT NULL,
    `bio`            TEXT              NULL,
    `website_url`    VARCHAR(2048)     NULL,
    `instagram_url`  VARCHAR(2048)     NULL,
    `created_at`     DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_uuid_unique`   (`uuid`),
    UNIQUE KEY `users_gbc_id_unique` (`gbc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `projects` (
    `id`                INT      NOT NULL AUTO_INCREMENT,
    `uuid`              CHAR(36)          NOT NULL,
    `user_id`           INT      NOT NULL,
    `title`             VARCHAR(255)      NOT NULL,
    `slug`              VARCHAR(255)      NOT NULL,
    `short_description` VARCHAR(500)      NULL,
    `long_description`  TEXT              NULL,
    `active`            TINYINT(1)        NOT NULL DEFAULT 1,
    `display_order`     INT               NOT NULL DEFAULT 0,
    `published_at`      DATETIME          NULL,
    `deleted_at`        DATETIME          NULL,
    `created_at`        DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`        DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `projects_uuid_unique` (`uuid`),
    UNIQUE KEY `projects_slug_unique` (`slug`),
    KEY `projects_user_id_index` (`user_id`),
    CONSTRAINT `projects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
