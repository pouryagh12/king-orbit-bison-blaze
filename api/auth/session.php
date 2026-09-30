<?php

declare(strict_types=1);

$config = require __DIR__ . '/../config.php';

session_name($config['session']['name']);

session_set_cookie_params([
    'lifetime' => $config['session']['lifetime'],
    'path' => '/',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'httponly' => true,
    'samesite' => 'Lax',
]);

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

function requireUserId(): int
{
    $userId = $_SESSION['user_id'] ?? null;

    if (!is_int($userId) && !ctype_digit((string) $userId)) {
        require __DIR__ . '/../response.php';

        jsonResponse(
            [
                'ok' => false,
                'error' => 'unauthorized',
            ],
            401
        );
    }

    return (int) $userId;
}

function currentUserId(): ?int
{
    $userId = $_SESSION['user_id'] ?? null;

    if (!is_int($userId) && !ctype_digit((string) $userId)) {
        return null;
    }

    return (int) $userId;
}