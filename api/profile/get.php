<?php

declare(strict_types=1);

require __DIR__ . '/../response.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/../auth/session.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'method_not_allowed',
        ],
        405
    );
}

$userId = requireUserId();

try {
    $stmt = $pdo->prepare(
        'SELECT
            u.id,
            u.name,
            u.email,
            p.sex,
            p.age,
            p.height_cm,
            p.weight_kg,
            p.activity,
            p.goal,
            p.calorie_goal,
            p.protein_goal,
            p.carbs_goal,
            p.fat_goal
         FROM users u
         LEFT JOIN profiles p ON p.user_id = u.id
         WHERE u.id = :user_id
         LIMIT 1'
    );

    $stmt->execute([
        'user_id' => $userId,
    ]);

    $profile = $stmt->fetch();

    if (!$profile) {
        jsonResponse(
            [
                'ok' => false,
                'error' => 'user_not_found',
            ],
            404
        );
    }

    jsonResponse([
        'ok' => true,
        'profile' => [
            'user' => [
                'id' => (int) $profile['id'],
                'name' => (string) $profile['name'],
                'email' => (string) $profile['email'],
            ],
            'sex' => (string) $profile['sex'],
            'age' => (int) $profile['age'],
            'heightCm' => (float) $profile['height_cm'],
            'weightKg' => (float) $profile['weight_kg'],
            'activity' => (string) $profile['activity'],
            'goal' => (string) $profile['goal'],
            'calorieGoal' => (float) $profile['calorie_goal'],
            'proteinGoal' => (float) $profile['protein_goal'],
            'carbsGoal' => (float) $profile['carbs_goal'],
            'fatGoal' => (float) $profile['fat_goal'],
        ],
    ]);
} catch (Throwable $e) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'profile_fetch_failed',
        ],
        500
    );
}