<?php

declare(strict_types=1);

require __DIR__ . '/../response.php';
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

$_SESSION = [];

if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();

    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params['path'],
        $params['domain'] ?? '',
        (bool) $params['secure'],
        (bool) $params['httponly']
    );
}

session_destroy();

jsonResponse([
    'ok' => true,
]);