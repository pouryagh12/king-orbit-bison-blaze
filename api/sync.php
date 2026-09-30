<?php

declare(strict_types=1);

require __DIR__ . '/response.php';
require __DIR__ . '/db.php';
require __DIR__ . '/auth/session.php';

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
    /*
     * User
     */
    $userStmt = $pdo->prepare(
        'SELECT id, name, email
         FROM users
         WHERE id = :user_id
         LIMIT 1'
    );

    $userStmt->execute([
        'user_id' => $userId,
    ]);

    $user = $userStmt->fetch();

    if (!$user) {
        jsonResponse(
            [
                'ok' => false,
                'error' => 'user_not_found',
            ],
            404
        );
    }

    /*
     * Profile
     */
    $profileStmt = $pdo->prepare(
        'SELECT
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
         FROM profiles
         WHERE user_id = :user_id
         LIMIT 1'
    );

    $profileStmt->execute([
        'user_id' => $userId,
    ]);

    $profileRow = $profileStmt->fetch();

    $profile = null;

    if ($profileRow) {
        $profile = [
            'name' => (string) $user['name'],
            'sex' => (string) $profileRow['sex'],
            'age' => (int) $profileRow['age'],
            'heightCm' => (float) $profileRow['height_cm'],
            'weightKg' => (float) $profileRow['weight_kg'],
            'activity' => (string) $profileRow['activity'],
            'goal' => (string) $profileRow['goal'],
            'calorieGoal' => (float) $profileRow['calorie_goal'],
            'proteinGoal' => (float) $profileRow['protein_goal'],
            'carbsGoal' => (float) $profileRow['carbs_goal'],
            'fatGoal' => (float) $profileRow['fat_goal'],
        ];
    }

    /*
     * Days
     */
    $daysStmt = $pdo->prepare(
        'SELECT id, log_date, water
         FROM days
         WHERE user_id = :user_id
         ORDER BY log_date ASC'
    );

    $daysStmt->execute([
        'user_id' => $userId,
    ]);

    $days = [];

    foreach ($daysStmt->fetchAll() as $day) {
        $days[(string) $day['log_date']] = [
            'date' => (string) $day['log_date'],
            'entries' => [],
            'water' => (int) $day['water'],
        ];
    }

    /*
     * Food entries
     */
    $entriesStmt = $pdo->prepare(
        'SELECT
            fe.id,
            fe.day_id,
            fe.food_id,
            fe.name,
            fe.meal,
            fe.grams,
            fe.kcal,
            fe.protein,
            fe.carbs,
            fe.fat,
            fe.created_at,
            d.log_date
         FROM food_entries fe
         INNER JOIN days d ON d.id = fe.day_id
         WHERE d.user_id = :user_id
         ORDER BY fe.created_at DESC'
    );

    $entriesStmt->execute([
        'user_id' => $userId,
    ]);

    foreach ($entriesStmt->fetchAll() as $entry) {
        $date = (string) $entry['log_date'];

        if (!isset($days[$date])) {
            $days[$date] = [
                'date' => $date,
                'entries' => [],
                'water' => 0,
            ];
        }

        $days[$date]['entries'][] = [
            'id' => (string) $entry['id'],
            'foodId' => $entry['food_id'] !== null
                ? (string) $entry['food_id']
                : null,
            'name' => (string) $entry['name'],
            'meal' => (string) $entry['meal'],
            'grams' => (float) $entry['grams'],
            'kcal' => (float) $entry['kcal'],
            'protein' => (float) $entry['protein'],
            'carbs' => (float) $entry['carbs'],
            'fat' => (float) $entry['fat'],
            'createdAt' => strtotime((string) $entry['created_at']) * 1000,
        ];
    }

    /*
     * Recent foods
     */
    $recentStmt = $pdo->prepare(
        'SELECT food_id
         FROM recent_foods
         WHERE user_id = :user_id
         ORDER BY used_at DESC
         LIMIT 12'
    );

    $recentStmt->execute([
        'user_id' => $userId,
    ]);

    $recentFoodIds = array_map(
        static fn(array $row): string => (string) $row['food_id'],
        $recentStmt->fetchAll()
    );

    jsonResponse([
        'ok' => true,
        'user' => [
            'id' => (int) $user['id'],
            'name' => (string) $user['name'],
            'email' => (string) $user['email'],
        ],
        'profile' => $profile,
        'days' => $days,
        'recentFoodIds' => $recentFoodIds,
    ]);
} catch (Throwable $e) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'sync_fetch_failed',
        ],
        500
    );
}