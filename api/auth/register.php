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

$name = trim((string) ($body['name'] ?? ''));
$email = strtolower(trim((string) ($body['email'] ?? '')));
$password = (string) ($body['password'] ?? '');

if ($name === '' || mb_strlen($name) > 100) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_name',
        ],
        422
    );
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_email',
        ],
        422
    );
}

if (strlen($password) < 8) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'password_too_short',
        ],
        422
    );
}

try {
    $check = $pdo->prepare(
        'SELECT id FROM users WHERE email = :email LIMIT 1'
    );

    $check->execute([
        'email' => $email,
    ]);

    if ($check->fetch()) {
        jsonResponse(
            [
                'ok' => false,
                'error' => 'email_already_registered',
            ],
            409
        );
    }

    $passwordHash = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    $pdo->beginTransaction();

    $insertUser = $pdo->prepare(
        'INSERT INTO users (name, email, password_hash)
         VALUES (:name, :email, :password_hash)'
    );

    $insertUser->execute([
        'name' => $name,
        'email' => $email,
        'password_hash' => $passwordHash,
    ]);

    $userId = (int) $pdo->lastInsertId();

    $insertProfile = $pdo->prepare(
        'INSERT INTO profiles (
            user_id,
            sex,
            age,
            height_cm,
            weight_kg,
            activity,
            goal,
            calorie_goal,
            protein_goal,
            carbs_goal,
            fat_goal
        )
        VALUES (
            :user_id,
            :sex,
            :age,
            :height_cm,
            :weight_kg,
            :activity,
            :goal,
            :calorie_goal,
            :protein_goal,
            :carbs_goal,
            :fat_goal
        )'
    );

    $insertProfile->execute([
        'user_id' => $userId,
        'sex' => 'female',
        'age' => 28,
        'height_cm' => 165,
        'weight_kg' => 65,
        'activity' => 'light',
        'goal' => 'maintain',
        'calorie_goal' => 2000,
        'protein_goal' => 120,
        'carbs_goal' => 220,
        'fat_goal' => 65,
    ]);

    $pdo->commit();

    session_regenerate_id(true);

    $_SESSION['user_id'] = $userId;

    jsonResponse([
        'ok' => true,
        'user' => [
            'id' => $userId,
            'name' => $name,
            'email' => $email,
        ],
    ], 201);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    jsonResponse(
        [
            'ok' => false,
            'error' => 'registration_failed',
        ],
        500
    );
}