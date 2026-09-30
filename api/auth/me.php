<?php

declare(strict_types=1);

require __DIR__ . '/../response.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/session.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'method_not_allowed',
        ],
        405
    );
}

$userId = currentUserId();

if ($userId === null) {
    jsonResponse([
        'ok' => true,
        'authenticated' => false,
        'user' => null,
    ]);
}

try {
    $stmt = $pdo->prepare(
        'SELECT id, name, email
         FROM users
         WHERE id = :id
         LIMIT 1'
    );

    $stmt->execute([
        'id' => $userId,
    ]);

    $user = $stmt->fetch();

    if (!$user) {
        $_SESSION = [];
        session_destroy();

        jsonResponse([
            'ok' => true,
            'authenticated' => false,
            'user' => null,
        ]);
    }

    jsonResponse([
        'ok' => true,
        'authenticated' => true,
        'user' => [
            'id' => (int) $user['id'],
            'name' => (string) $user['name'],
            'email' => (string) $user['email'],
        ],
    ]);
} catch (Throwable $e) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'session_check_failed',
        ],
        500
    );
}