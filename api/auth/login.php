<?php

declare(strict_types=1);

require __DIR__ . '/../response.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/session.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'method_not_allowed',
        ],
        405
    );
}

$body = getJsonBody();

$email = strtolower(trim((string) ($body['email'] ?? '')));
$password = (string) ($body['password'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_credentials',
        ],
        401
    );
}

if ($password === '') {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_credentials',
        ],
        401
    );
}

try {
    $stmt = $pdo->prepare(
        'SELECT id, name, email, password_hash
         FROM users
         WHERE email = :email
         LIMIT 1'
    );

    $stmt->execute([
        'email' => $email,
    ]);

    $user = $stmt->fetch();

    if (
        !$user ||
        !password_verify(
            $password,
            (string) $user['password_hash']
        )
    ) {
        jsonResponse(
            [
                'ok' => false,
                'error' => 'invalid_credentials',
            ],
            401
        );
    }

    session_regenerate_id(true);

    $_SESSION['user_id'] = (int) $user['id'];

    jsonResponse([
        'ok' => true,
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
            'error' => 'login_failed',
        ],
        500
    );
}