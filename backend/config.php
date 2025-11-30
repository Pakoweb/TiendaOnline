<?php
// config.php
// --------------
// Archivo de configuración común para toda la API.
// Define cabeceras, token fijo, rutas de JSON y funciones auxiliares.

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Token simple fijo (clave privada de la "API")
$TOKEN_PRIVADO = "TOKEN_SUPER_SECRETO_123";

// Rutas de los archivos JSON con usuarios y tienda
$USUARIOS_FILE = __DIR__ . "/data/usuarios.json";
$TIENDA_FILE   = __DIR__ . "/data/tienda.json";

/**
 * Lee un archivo JSON y lo devuelve como array asociativo.
 */
function leer_json($ruta) {
    if (!file_exists($ruta)) {
        return [];
    }
    $contenido = file_get_contents($ruta);
    return json_decode($contenido, true);
}

/**
 * Valida el token enviado desde el cliente en la cabecera Authorization.
 * Si es incorrecto o falta, corta la ejecución con error.
 */
function validar_token() {
    global $TOKEN_PRIVADO;

    $headers = getallheaders();
    if (!isset($headers["Authorization"])) {
        http_response_code(401);
        echo json_encode(["error" => "Token requerido"]);
        exit;
    }

    // Se espera algo como "Bearer TOKEN..."
    $auth = $headers["Authorization"];
    $partes = explode(" ", $auth);
    if (count($partes) != 2 || $partes[1] !== $TOKEN_PRIVADO) {
        http_response_code(403);
        echo json_encode(["error" => "Token inválido"]);
        exit;
    }
}
