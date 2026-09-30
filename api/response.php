<?php

declare(strict_types=1);

function jsonResponse(
    array $data,
    int $status = 200
): never {
    http_response_code($status);

    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    exit;
}

function getJsonBody(): array
{
    $raw = file_get_contents('php://input');

    if ($raw === false || trim($raw) === '') {
        return [];
    }

    try {
        $data = json_decode(
            $raw,
            true,
            512,
            JSON_THROW_ON_ERROR
        );
    } catch (JsonException) {
        jsonResponse(
            [
                'ok' => false,
                'error' => 'invalid_json',
            ],
            400
        );
    }

    if (!is_array($data)) {
        jsonResponse(
            [
                'ok' => false,
                'error' => 'invalid_request_body',
            ],
            400
        );
    }

    return $data;
}