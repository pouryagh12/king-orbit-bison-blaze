<?php

declare(strict_types=1);

/*
 * Database configuration.
 *
 * IMPORTANT:
 * Do not put real production credentials in Git.
 * On the hosting server, replace these values with the actual
 * DirectAdmin MySQL database credentials.
 */

return [
    'db' => [
        'host' => getenv('DB_HOST') ?: '127.0.0.1',
        'name' => getenv('DB_NAME') ?: 'peymaneh_test',
        'user' => getenv('DB_USER') ?: 'root',
        'password' => getenv('DB_PASSWORD') ?: '',
        'charset' => 'utf8mb4',
    ],

    'session' => [
        'name' => 'peymaneh_session',
        'lifetime' => 60 * 60 * 24 * 30,
    ],
];