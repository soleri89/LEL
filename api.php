<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$file = __DIR__ . '/../data/ming.json';
if (!file_exists($file)) {
    http_response_code(404);
    echo json_encode(['error' => 'ming.json not found']);
    exit;
}

echo file_get_contents($file);
