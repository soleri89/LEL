<?php
// Future MySQL connection layer.
// Keep credentials outside the public web root in a real deployment.

function db(): PDO {
    $host = getenv('MING_DB_HOST') ?: '127.0.0.1';
    $name = getenv('MING_DB_NAME') ?: 'ming_exe';
    $user = getenv('MING_DB_USER') ?: 'root';
    $pass = getenv('MING_DB_PASS') ?: '';
    $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
    return new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}
