<?php

declare(strict_types=1);

require __DIR__ . '/../response.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/../auth/session.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'method_not_allowed',
        ],
        405
    );
}

$userId = requireUserId();
$body = getJsonBody();

$date = trim((string) ($body['date'] ?? ''));
$water = (int) ($body['water'] ?? 0);
$entries = $body['entries'] ?? [];

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

if ($water < 0 || $water > 12) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_water',
        ],
        422
    );
}

if (!is_array($entries)) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_entries',
        ],
        422
    );
}

try {
    $pdo->beginTransaction();

    /*
     * Create the day if it does not exist,
     * otherwise update its water amount.
     */
    $dayStmt = $pdo->prepare(
        'INSERT INTO days (
            user_id,
            log_date,
            water
        )
        VALUES (
            :user_id,
            :log_date,
            :water
        )
        ON DUPLICATE KEY UPDATE
            water = VALUES(water)'
    );

    $dayStmt->execute([
        'user_id' => $userId,
        'log_date' => $date,
        'water' => $water,
    ]);

    $dayIdStmt = $pdo->prepare(
        'SELECT id
         FROM days
         WHERE user_id = :user_id
           AND log_date = :log_date
         LIMIT 1'
    );

    $dayIdStmt->execute([
        'user_id' => $userId,
        'log_date' => $date,
    ]);

    $day = $dayIdStmt->fetch();

    if (!$day) {
        throw new RuntimeException('Day was not created.');
    }

    $dayId = (int) $day['id'];

    /*
     * Replace all entries for this day with the
     * current state sent by the client.
     *
     * This keeps the server synchronized with the
     * current Zustand state.
     */
    $deleteStmt = $pdo->prepare(
        'DELETE FROM food_entries
         WHERE day_id = :day_id'
    );

    $deleteStmt->execute([
        'day_id' => $dayId,
    ]);

    $insertStmt = $pdo->prepare(
        'INSERT INTO food_entries (
            id,
            day_id,
            food_id,
            name,
            meal,
            grams,
            kcal,
            protein,
            carbs,
            fat,
            created_at
        )
        VALUES (
            :id,
            :day_id,
            :food_id,
            :name,
            :meal,
            :grams,
            :kcal,
            :protein,
            :carbs,
            :fat,
            FROM_UNIXTIME(:created_at)
        )'
    );

    foreach ($entries as $entry) {
        if (!is_array($entry)) {
            throw new InvalidArgumentException('Invalid food entry.');
        }

        $id = trim((string) ($entry['id'] ?? ''));

        if ($id === '') {
            $id = sprintf(
                '%s-%s-%s-%s-%s',
                bin2hex(random_bytes(4)),
                bin2hex(random_bytes(2)),
                bin2hex(random_bytes(2)),
                bin2hex(random_bytes(2)),
                bin2hex(random_bytes(6))
            );
        }

        $name = trim((string) ($entry['name'] ?? ''));
        $meal = trim((string) ($entry['meal'] ?? ''));

        if ($name === '' || $meal === '') {
            throw new InvalidArgumentException('Invalid food entry data.');
        }

        $createdAt = (int) ($entry['createdAt'] ?? round(microtime(true) * 1000));

        /*
         * JavaScript timestamps are milliseconds.
         * MySQL FROM_UNIXTIME expects seconds.
         */
        $createdAtSeconds = (int) floor($createdAt / 1000);

        $insertStmt->execute([
            'id' => $id,
            'day_id' => $dayId,
            'food_id' => isset($entry['foodId']) && $entry['foodId'] !== ''
                ? (string) $entry['foodId']
                : null,
            'name' => $name,
            'meal' => $meal,
            'grams' => (float) ($entry['grams'] ?? 0),
            'kcal' => (float) ($entry['kcal'] ?? 0),
            'protein' => (float) ($entry['protein'] ?? 0),
            'carbs' => (float) ($entry['carbs'] ?? 0),
            'fat' => (float) ($entry['fat'] ?? 0),
            'created_at' => $createdAtSeconds,
        ]);
    }

    $pdo->commit();

    jsonResponse([
        'ok' => true,
        'date' => $date,
        'water' => $water,
        'entriesCount' => count($entries),
    ]);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    jsonResponse(
        [
            'ok' => false,
            'error' => 'day_save_failed',
        ],
        500
    );
}