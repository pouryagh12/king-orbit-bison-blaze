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

$date = trim((string) ($_GET['date'] ?? ''));

$dateObject = DateTime::createFromFormat('Y-m-d', $date);

if (
    !$dateObject ||
    $dateObject->format('Y-m-d') !== $date
) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_date',
        ],
        422
    );
}

try {
    $dayStmt = $pdo->prepare(
        'SELECT id, log_date, water
         FROM days
         WHERE user_id = :user_id
           AND log_date = :log_date
         LIMIT 1'
    );

    $dayStmt->execute([
        'user_id' => $userId,
        'log_date' => $date,
    ]);

    $day = $dayStmt->fetch();

    if (!$day) {
        jsonResponse([
            'ok' => true,
            'day' => [
                'date' => $date,
                'water' => 0,
                'entries' => [],
            ],
        ]);
    }

    $entryStmt = $pdo->prepare(
        'SELECT
            id,
            food_id,
            name,
            meal,
            grams,
            kcal,
            protein,
            carbs,
            fat,
            created_at
         FROM food_entries
         WHERE day_id = :day_id
         ORDER BY created_at DESC'
    );

    $entryStmt->execute([
        'day_id' => (int) $day['id'],
    ]);

    $entries = [];

    foreach ($entryStmt->fetchAll() as $entry) {
        $entries[] = [
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

    jsonResponse([
        'ok' => true,
        'day' => [
            'date' => (string) $day['log_date'],
            'water' => (int) $day['water'],
            'entries' => $entries,
        ],
    ]);
} catch (Throwable $e) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'day_fetch_failed',
        ],
        500
    );
}