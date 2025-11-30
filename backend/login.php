<?php
// login.php
// --------------
// Endpoint de login.
// Recibe usuario y contraseña, los comprueba contra usuarios.json.
// Si son correctos, devuelve el token y la tienda completa.

require_once "config.php";

// Leemos el JSON enviado por el cliente (usuario y password)
$input = json_decode(file_get_contents("php://input"), true);

$usuario = $input["usuario"] ?? "";
$password = $input["password"] ?? "";

// Cargamos usuarios desde el JSON
$usuarios = leer_json($USUARIOS_FILE);
$encontrado = false;

foreach ($usuarios as $u) {
    if ($u["usuario"] === $usuario && $u["password"] === $password) {
        $encontrado = true;
        break;
    }
}

if (!$encontrado) {
    // Credenciales incorrectas
    http_response_code(401);
    echo json_encode(["error" => "Credenciales inválidas"]);
    exit;
}

// Si son correctas, cargamos la tienda
$tienda = leer_json($TIENDA_FILE);

// Devolvemos el token fijo y toda la información de la tienda
echo json_encode([
    "token" => $TOKEN_PRIVADO,
    "tienda" => $tienda
]);
