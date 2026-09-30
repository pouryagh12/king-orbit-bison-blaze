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

$name = trim((string) ($body['name'] ?? ''));
$sex = trim((string) ($body['sex'] ?? ''));
$age = (int) ($body['age'] ?? 0);
$heightCm = (float) ($body['heightCm'] ?? 0);
$weightKg = (float) ($body['weightKg'] ?? 0);
$activity = trim((string) ($body['activity'] ?? ''));
$goal = trim((string) ($body['goal'] ?? ''));
$calorieGoal = (float) ($body['calorieGoal'] ?? 0);
$proteinGoal = (float) ($body['proteinGoal'] ?? 0);
$carbsGoal = (float) ($body['carbsGoal'] ?? 0);
$fatGoal = (float) ($body['fatGoal'] ?? 0);

if ($name === '' || mb_strlen($name) > 100) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_name',
        ],
        422
    );
}

if (!in_array($sex, ['male', 'female'], true)) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_sex',
        ],
        422
    );
}

if ($age < 1 || $age > 120) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_age',
        ],
        422
    );
}

if ($heightCm < 50 || $heightCm > 250) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_height',
        ],
        422
    );
}

if ($weightKg < 20 || $weightKg > 500) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_weight',
        ],
        422
    );
}

if ($activity === '' || mb_strlen($activity) > 30) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_activity',
        ],
        422
    );
}

if ($goal === '' || mb_strlen($goal) > 30) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_goal',
        ],
        422
    );
}

if (
    $calorieGoal <= 0 ||
    $proteinGoal < 0 ||
    $carbsGoal < 0 ||
    $fatGoal < 0
) {
    jsonResponse(
        [
            'ok' => false,
            'error' => 'invalid_goals',
        ],
        422
    );
}

try {
    $pdo->beginTransaction();

    $userStmt = $pdo->prepare(
        'UPDATE users
         SET name = :name
         WHERE id = :user_id'
    );

    $userStmt->execute([
        'name' => $name,
        'user_id' => $userId,
    ]);

    $profileStmt = $pdo->prepare(
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
        )
        ON DUPLICATE KEY UPDATE
            sex = VALUES(sex),
            age = VALUES(age),
            height_cm = VALUES(height_cm),
            weight_kg = VALUES(weight_kg),
            activity = VALUES(activity),
            goal = VALUES(goal),
            calorie_goal = VALUES(calorie_goal),
            protein_goal = VALUES(protein_goal),
            carbs_goal = VALUES(carbs_goal),
            fat_goal = VALUES(fat_goal)'
    );

    $profileStmt->execute([
        'user_id' => $userId,
        'sex' => $sex,
        'age' => $age,
        'height_cm' => $heightCm,
        'weight_kg' => $weightKg,
        'activity' => $activity,
        'goal' => $goal,
        'calorie_goal' => $calorieGoal,
        'protein_goal' => $proteinGoal,
        'carbs_goal' => $carbsGoal,
        'fat_goal' => $fatGoal,
    ]);

    $pdo->commit();

    jsonResponse([
        'ok' => true,
    ]);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    jsonResponse(
        [
            'ok' => false,
            'error' => 'profile_update_failed',
        ],
        500
    );
}