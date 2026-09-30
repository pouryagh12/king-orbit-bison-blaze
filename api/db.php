<?php

declare(strict_types=1);

$config = require __DIR__ . '/config.php';

$db = $config['db'];

$dsn = sprintf(
    'mysql:host=%s;dbname=%s;charset=%s',
    $db['host'],
    $db['name'],
    $db['charset']
);

try {
    $pdo = new PDO(
        $dsn,
        $db['user'],
        $db['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');

    echo json_encode(
        [
            'ok' => false,
            'error' => 'database_connection_failed',
        ],
        JSON_UNESCAPED_UNICODE
    );

    exit;
}